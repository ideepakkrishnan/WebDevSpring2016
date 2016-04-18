/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("DashboardController", dashboardController);

    function dashboardController($window, $rootScope, $location, $filter, DeviceService, TeamService, UserService, HealthLogService) {
        var vm = this;

        function init() {
            vm.connectAccount = connectAccount;
            vm.chartHandle = chartHandle;

            vm.series = ['Steps', 'Calories Burned'];
            vm.data = [[], []];
            vm.labels = [];

            // Handle callback
            if ($rootScope.currentUser == null) {
                $rootScope.currentUser = retrieveCachedUserInfo();
            }

            // Check if the user is logged in and redirect accordingly
            if ($rootScope.currentUser) {
                vm.userId = $rootScope.currentUser._id;
                vm.username = $rootScope.currentUser.username;
                vm.password = $rootScope.currentUser.password;
                vm.firstName = $rootScope.currentUser.firstName;
                vm.lastName = $rootScope.currentUser.lastName;
                vm.userEmail = $rootScope.currentUser.email;
                vm.teams = $rootScope.currentUser.teams;
                vm.roles = $rootScope.currentUser.roles;

                TeamService.fetchTeamDetails(vm.teams)
                    .then(
                        function(response) {
                            vm.myTeams = response.data;
                        },
                        function (err) {
                            console.log(err);
                        }
                    );

                // Initialize provider connection details
                retrieveConnectionDetails();

                // Initialize provider profile data
                if ($rootScope.account_user_id && $rootScope.access_token) {

                    vm.profileData = DeviceService.getProfileData();
                    vm.profileData.then(function (data) {
                        console.log(data);
                    });

                    // Initialize activity data
                    var dates = [];
                    var past_days = 7;
                    var today = new Date();

                    for (var i=1; i<=past_days; i++) {
                        var curr_date = new Date();
                        curr_date.setDate(today.getDate() - (past_days - i));
                        curr_date = $filter('date')(curr_date, "yyyy-MM-dd");

                        dates.push(curr_date);
                    }

                    vm.activityData = DeviceService.getActivityData(dates);
                    vm.activityData.then(function (data){
                        initializeChart(data, dates);
                    });

                    var curr_date = new Date();
                    curr_date = $filter('date')(curr_date, "yyyy-MM-dd");
                    syncWeeklyData(curr_date);
                }

                // Initialize visualizations
                var div1=d3.select(document.getElementById('div1'));
                var div2=d3.select(document.getElementById('div2'));
                var div3=d3.select(document.getElementById('div3'));
                var div4=d3.select(document.getElementById('div4'));

                start();
            } else {
                $location.path("#/home");
            }
        }
        init();

        function onClick1() {

        }

        function onClick2() {

        }

        function onClick3() {

        }

        function labelFunction(val,min,max) {

        }

        function start() {
            var rp1 = radialProgress(document.getElementById('div1'))
                .label("Sleep")
                .onClick(onClick1)
                .diameter(150)
                .value(78)
                .render();

            var rp2 = radialProgress(document.getElementById('div2'))
                .label("Activity")
                .onClick(onClick2)
                .diameter(150)
                .value(132)
                .render();

            var rp3 = radialProgress(document.getElementById('div3'))
                .label("Weight")
                .onClick(onClick3)
                .diameter(150)
                .minValue(100)
                .maxValue(200)
                .value(150)
                .render();
        }

        function connectAccount() {
            vm.fitbit_client_id = "227G2P";
            $window.location.href ="https://www.fitbit.com/oauth2/authorize?client_id=" + vm.fitbit_client_id + "&response_type=token&scope=activity%20profile&expires_in=2592000";
        }

        function retrieveCachedUserInfo() {
            var cachedUser = JSON.parse(window.sessionStorage.getItem("pxUserCache"));
            if (cachedUser) {
                return cachedUser.currentUser;
            } else {
                return null;
            }
        }

        function retrieveConnectionDetails() {
            if (JSON.parse(window.localStorage.getItem("fitbit"))) {
                console.log("Authorized");
                $rootScope.access_token = JSON.parse(window.localStorage.getItem("fitbit")).oauth.access_token;
                $rootScope.expires_in = JSON.parse(window.localStorage.getItem("fitbit")).oauth.expires_in;
                $rootScope.account_user_id = JSON.parse(window.localStorage.getItem("fitbit")).oauth.account_user_id;

                if ($rootScope.access_token && $rootScope.account_user_id) {
                    // Store the connection details in database
                    var conn_details = {
                        accessToken: $rootScope.access_token,
                        expiresIn: $rootScope.expires_in,
                        accountUserId: $rootScope.account_user_id
                    };

                    UserService.updateDeviceConnection(vm.userId, conn_details);
                }
            } else {
                console.log("Unauthorized");
            }
        }

        function chartHandle (points, evt) {
            console.log(points, evt);
        }

        function initializeChart(data, dates) {
            var activities = [];
            var idx = 0;
            var goals =  [];

            for (var i=0; i<dates.length; i++) {
                var curr_date = dates[i];

                curr_date = $filter('date')(curr_date, "EEE d");
                vm.labels.push(curr_date);
            }

            angular.forEach(data, function(value, key) {

                var activity = value.data.summary;
                var goal = value.data.goals;
                var info = {};

                goals.push(goal);

                info.steps = activity.steps;
                info.calories = activity.caloriesOut;
                info.caloriesBMR = activity.caloriesBMR;

                activities.push(info);
                activities[idx].day = dates[idx];

                idx++;
            });

            for (var i = 0; i < activities.length; i++) {
                vm.data[0].push(activities[i].steps);
                vm.data[1].push(activities[i].calories);
            }

            //vm.labels = activities;
            vm.todayStepData = [activities[6].steps, goals[6].steps - activities[6].steps];
            vm.todayStepLabels = ["Steps taken", "Away from goal"];

            vm.todayCaloriesData = [activities[6].calories, goals[6].caloriesOut - activities[6].calories];
            vm.todayCaloriesLabels = ["Calories Burned", "Away from goal"];

            var netDistance = 0;
            if (activities[6].distances) {
                for (var i=0; i<activities[6].distances.length; i++) {
                    netDistance += activities[6].distances[i].distance;
                }
            }
            vm.todayDistanceData = [netDistance, goals[6].distance - netDistance];
            vm.todayDistanceLabels = ["Distance Covered", "Away from goal"];
        }

        function syncWeeklyData(date) {
            syncWeeklyActivityData(date);
        }

        function syncWeeklyActivityData(date) {
            // Calorie data
            DeviceService
                .getWeeklyCalorieData(date)
                .then(
                    function (doc) {
                        var healthDataObj = {
                            username: vm.username,
                            type: 'calories',
                            healthdata: doc[0].data["activities-calories"],
                            date: new Date()
                        };
                        return HealthLogService.createHealthLog(healthDataObj);
                    },
                    function (err) {
                        console.log("dashboard.controller - getWeeklyCalorieData - error: " + err.message);
                    }
                )
                .then(
                    function (doc) {

                    },
                    function (err) {
                        console.log("dashboard.controller - getWeeklyCalorieData - error: " + err.message);
                    }
                );

            // Distance data
            DeviceService
                .getWeeklyDistanceData(date)
                .then(
                    function (doc) {
                        console.log("dashboard.controller - getWeeklyDistanceData: " + JSON.stringify(doc));
                        var healthDataObj = {
                            username: vm.username,
                            type: 'distance',
                            healthdata: doc[0].data["activities-distance"],
                            date: new Date()
                        };
                        return HealthLogService.createHealthLog(healthDataObj);
                    },
                    function (err) {
                        console.log("dashboard.controller - getWeeklyDistanceData - error: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        console.log("dashboard.controller - getWeeklyDistanceData - createHealthLog - result: " + JSON.stringify(doc));
                    },
                    function (err) {
                        console.log("dashboard.controller - getWeeklyDistanceData - error: " + err.message);
                    }
                );

            // Floors data
            DeviceService
                .getWeeklyFloorsData(date)
                .then(
                    function (doc) {
                        console.log("dashboard.controller - getWeeklyFloorsData: " + JSON.stringify(doc));
                        var healthDataObj = {
                            username: vm.username,
                            type: 'floors',
                            healthdata: doc[0].data["activities-floors"],
                            date: new Date()
                        };
                        return HealthLogService.createHealthLog(healthDataObj);
                    },
                    function (err) {
                        console.log("dashboard.controller - getWeeklyFloorsData - error: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        console.log("dashboard.controller - getWeeklyFloorsData - createHealthLog - result: " + JSON.stringify(doc));
                    },
                    function (err) {
                        console.log("dashboard.controller - getWeeklyFloorsData - error: " + err.message);
                    }
                );

            // Steps data
            DeviceService
                .getWeeklyStepsData(date)
                .then(
                    function (doc) {
                        console.log("dashboard.controller - getWeeklyStepsData: " + JSON.stringify(doc));
                        var healthDataObj = {
                            username: vm.username,
                            type: 'steps',
                            healthdata: doc[0].data["activities-steps"],
                            date: new Date()
                        };
                        return HealthLogService.createHealthLog(healthDataObj);
                    },
                    function (err) {
                        console.log("dashboard.controller - getWeeklyStepsData - error: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        console.log("dashboard.controller - getWeeklyStepsData - createHealthLog - result: " + JSON.stringify(doc));
                    },
                    function (err) {
                        console.log("dashboard.controller - getWeeklyStepsData - error: " + err.message);
                    }
                );
        }
    }
})();