/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("DashboardController", dashboardController);

    function dashboardController($scope, $window, $rootScope, $location, $filter, UserService, DeviceService, GoalService) {
        $scope.connectAccount = connectAccount;

        function init() {
            // Handle callback
            if ($rootScope.currentUser == null) {
                $rootScope.currentUser = retrieveCachedUserInfo();
            }

            // Check if the user is logged in and redirect accordingly
            if ($rootScope.currentUser) {
                $scope.userId = $rootScope.currentUser._id;
                $scope.username = $rootScope.currentUser.username;
                $scope.password = $rootScope.currentUser.password;
                $scope.firstName = $rootScope.currentUser.firstName;
                $scope.lastName = $rootScope.currentUser.lastName;
                $scope.userEmail = $rootScope.currentUser.email;
                $scope.teams = $rootScope.currentUser.teams;
                $scope.roles = $rootScope.currentUser.roles;

                GoalService.fetchTeamDetails($scope.teams)
                    .then(
                        function(response) {
                            console.log(response);
                            $scope.myTeams = response;
                        },
                        function (err) {
                            console.log(err);
                        }
                    );

                // Initialize provider connection details
                retrieveConnectionDetails();

                // Initialize provider profile data
                if ($rootScope.account_user_id && $rootScope.access_token) {
                    $scope.profileData = DeviceService.getProfileData();
                    $scope.profileData.then(function (data) {
                        console.log(data);
                    });

                    // Initialize activity data
                    var dates = [];
                    var past_days = 4;
                    var today = new Date();

                    for (var i=0; i<past_days; i++) {
                        var curr_date = new Date();
                        curr_date.setDate(today.getDate() - i);
                        curr_date = $filter('date')(curr_date, "yyyy-MM-dd");

                        dates.push(curr_date);
                    }

                    $scope.activityData = DeviceService.getActivityData(dates);
                    $scope.activityData.then(function (data){
                        console.log(data);
                    });
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
            $scope.fitbit_client_id = "227G2P";
            $window.location.href ="https://www.fitbit.com/oauth2/authorize?client_id=" + $scope.fitbit_client_id + "&response_type=token&scope=activity%20profile&expires_in=2592000";
            console.log($location.url());
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
            } else {
                console.log("Unauthorized");
            }
        }
    }
})();