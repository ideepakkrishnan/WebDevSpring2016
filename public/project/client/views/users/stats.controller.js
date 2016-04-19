/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("StatsController", statsController);

    function statsController($rootScope, $location, $routeParams, $filter, UserService, TeamService, GoalService, HealthLogService) {
        var vm = this;

        function init() {
            vm.location = $location;
            vm.addGoal = addGoal;
            vm.updateGoal = updateGoal;
            vm.deleteGoal = deleteGoal;
            vm.selectGoal = selectGoal;

            UserService
                .getCurrentUser()
                .then(
                    function (currUser) {
                        vm.currUser = currUser.data;
                        UserService.setCurrentUser(vm.currUser);
                        return UserService.getUserByUsername($routeParams.username);
                    },
                    function (err) {
                        console.log("stats.controller - init error: " + err.message);
                        $rootScope.errorMessage = "You are not logged in!";
                    }
                )
                .then(
                    function (doc) {
                        vm.selectedUser = doc.data;

                        if (vm.selectedUser) {
                            vm.username = vm.selectedUser.username;
                            vm.password = vm.selectedUser.password;
                            vm.firstName = vm.selectedUser.firstName;
                            vm.lastName = vm.selectedUser.lastName;
                            vm.userEmail = vm.selectedUser.email;
                            vm.teams = vm.selectedUser.teams;
                            vm.roles = vm.selectedUser.roles;

                            // Chart data
                            vm.chartLabels = [];
                            vm.chartSeries = ["Calories", "Distance (metres)", "Steps"];
                            vm.chartData = [];

                            // Radar data
                            vm.radarLabels = ["Calories", "Distance (metres)", "Steps"];
                            vm.radarSeries = ["Calories", "Distance (metres)", "Steps"];
                            vm.radarMyData = [];
                            vm.radarFriendData = [];
                            vm.radarData = [];

                            // Initialize user stats
                            HealthLogService
                                .getSpecificHealthLogsForUser(vm.username, 'calories', 0)
                                .then(
                                    function (doc) {
                                        var calorieData = doc.data.res[0].healthdata;
                                        var calorieMeasures = [];
                                        var measuredDates = [];
                                        for (var i=0; i<calorieData.length; i++) {
                                            var curr_date = calorieData[i].dateTime;
                                            curr_date = $filter('date')(curr_date, "EEE d");
                                            measuredDates.push(curr_date);
                                            calorieMeasures.push(calorieData[i].value);
                                        }

                                        vm.chartLabels = measuredDates;
                                        vm.chartData.push(calorieMeasures);
                                        vm.radarFriendData.push(calorieData[6].value);
                                        return HealthLogService.getSpecificHealthLogsForUser(vm.username, 'distance', 0);
                                    },
                                    function (err) {
                                        console.log("stats.controller - getSpecificHealthLogsForUser - calories init - error: " + err.message);
                                    }
                                ).then(
                                function (doc) {
                                    var distanceData = doc.data.res[0].healthdata;
                                    var distanceMeasures = [];

                                    for (var i=0; i<distanceData.length; i++) {
                                        distanceMeasures.push(distanceData[i].value * 1609.344);
                                    }

                                    vm.chartData.push(distanceMeasures);
                                    vm.radarFriendData.push(distanceData[6].value * 1609.344);
                                    return HealthLogService.getSpecificHealthLogsForUser(vm.username, 'steps', 0);
                                },
                                function (err) {
                                    console.log("stats.controller - getSpecificHealthLogsForUser - distance init - error: " + err.message);
                                }
                            ).then(
                                function (doc) {
                                    var stepsData = doc.data.res[0].healthdata;
                                    var stepsMeasures = [];

                                    for (var i=0; i<stepsData.length; i++) {
                                        stepsMeasures.push(stepsData[i].value);
                                    }

                                    vm.chartData.push(stepsMeasures);
                                    vm.radarFriendData.push(stepsData[6].value);
                                    vm.radarData.push(vm.radarFriendData);
                                    return HealthLogService.getSpecificHealthLogsForUser($rootScope.currentUser.username, 'calories', 0);
                                },
                                function (err) {
                                    console.log("stats.controller - getSpecificHealthLogsForUser - stats init - error: " + err.message);
                                }
                            ).then(
                                function (doc) {
                                    var calorieData = doc.data.res[0].healthdata;
                                    vm.radarMyData.push(calorieData[6].value);
                                    return HealthLogService.getSpecificHealthLogsForUser($rootScope.currentUser.username, 'distance', 0);
                                },
                                function (err) {
                                    console.log("stats.controller.getSpecificHealthLogsForUser - my calories - init - error: " + err.message);
                                }
                            ).then(
                                function (doc) {
                                    var distanceData = doc.data.res[0].healthdata;
                                    vm.radarMyData.push(distanceData[6].value);
                                    return HealthLogService.getSpecificHealthLogsForUser($rootScope.currentUser.username, 'steps', 0);
                                },
                                function (err) {
                                    console.log("stats.controller.getSpecificHealthLogsForUser - my distance - init - error: " + err.message);
                                }
                            ).then(
                                function (doc) {
                                    var stepsData = doc.data.res[0].healthdata;
                                    vm.radarMyData.push(stepsData[6].value);
                                    vm.radarData.push(vm.radarMyData);
                                    console.log("Radar data: - " + vm.radarData)
                                },
                                function (err) {
                                    console.log("stats.controller.getSpecificHealthLogsForUser - my steps - init - error: " + err.message);
                                }
                            );

                            // Initialize team data
                            TeamService.fetchTeamDetails(vm.teams)
                                .then(
                                    function(response) {
                                        console.log("stats.controller - init - teams: " + JSON.stringify(response));
                                        vm.myTeams = response.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );

                            // Initialize goals set for this user by the currently logged in user
                            GoalService
                                .findAllGoalsAssignedToUserByWatcher(vm.username, $rootScope.currentUser.username)
                                .then(
                                    function (response) {
                                        vm.goals = response.data;
                                        renderCharts();
                                    },
                                    function (err) {
                                        console.log("Error: " + err.message);
                                    }
                                );
                        }
                    },
                    function (err) {
                        console.log("stats.controller - init() - error: " + err.message);
                        $rootScope.errorMessage = "Unable to fetch user stats! Please try again.";
                    }
                );
        }
        init();

        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        /* Custom functions */
        Date.prototype.formatDDMMMYYYY = function() {
            return this.getDate() + "-" + month[this.getMonth()] + "-" + this.getFullYear();
        };

        function addGoal() {
            var newGoal = {
                "name": vm.goalName,
                "username": vm.username,
                "assignedBy": $rootScope.currentUser.username,
                "calories": vm.calories,
                "weight": vm.weight,
                "fat": vm.fat,
                "steps": vm.steps,
                "distance": vm.distance,
                "duration": vm.duration,
                "floors": vm.floors,
                "date": (new Date(vm.date)).formatDDMMMYYYY(),
                "type": vm.goalType,
                "frequency": vm.frequency
            };

            GoalService
                .createGoal(newGoal)
                .then(
                    function(response) {
                        return GoalService.findAllGoalsAssignedToUserByWatcher(vm.username, $rootScope.currentUser.username);
                    },
                    function (err) {
                        console.log("goal.controller - addGoal - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to save the goal. Please try again.";
                    }
                )
                .then(
                    function (doc) {
                        vm.goals = doc.data;
                        renderCharts();

                        vm._id = "";
                        vm.goals = doc.data;
                        vm.username = "";
                        vm.calories = "";
                        vm.weight = "";
                        vm.fat = "";
                        vm.steps = "";
                        vm.distance = "";
                        vm.duration = "";
                        vm.floors = "";
                        vm.date = "";
                        vm.goalType = "";
                        vm.frequency = "";
                        vm.goalName = "";
                        $('#newGoalModal').modal('hide');
                    },
                    function (err) {
                        console.log("goal.controller - addGoal - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to retrieve the goals for this user.";
                    }
                );
        }

        function updateGoal() {
            var updatedGoal = {
                "name": vm.goalName,
                "username": vm.username,
                "assignedBy": $rootScope.currentUser.username,
                "calories": vm.calories,
                "weight": vm.weight,
                "fat": vm.fat,
                "steps": vm.steps,
                "distance": vm.distance,
                "duration": vm.duration,
                "floors": vm.floors,
                "date": (new Date(vm.date)).formatDDMMMYYYY(),
                "type": vm.goalType,
                "frequency": vm.frequency
            };

            GoalService.updateGoal(vm._id, updatedGoal)
                .then(
                    function(response) {
                        return GoalService.findAllGoalsAssignedToUserByWatcher(vm.username, $rootScope.currentUser.username);
                    },
                    function (err) {
                        console.log("goal.controller - updateGoal - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to update the goal. Please try again.";
                    }
                )
                .then(
                    function (doc) {
                        console.log("goal.controller - updateGoal - user goals: " + JSON.stringify(doc));
                        vm.goals = doc.data;
                        renderCharts();

                        // Clear all fields
                        vm._id = "";
                        vm.username = "";
                        vm.calories = "";
                        vm.weight = "";
                        vm.fat = "";
                        vm.steps = "";
                        vm.distance = "";
                        vm.duration = "";
                        vm.floors = "";
                        vm.date = "";
                        vm.goalType = "";
                        vm.frequency = "";
                        vm.goalName = "";
                        $('#updateGoalModal').modal('hide');
                    },
                    function (err) {
                        console.log("goal.controller - updateGoal - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to retrieve the goals for this user.";
                    }
                );
        }

        function deleteGoal(goalId) {
            GoalService
                .deleteGoalById(goalId)
                .then(
                    function(response) {
                        return GoalService.findAllGoalsAssignedToUserByWatcher(vm.username, $rootScope.currentUser.username);
                    },
                    function (err) {
                        console.log("goal.controller - deleteGoal - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to delete the goal. Please try again.";
                    }
                )
                .then(
                    function (doc) {
                        vm.goals = doc.data;

                        renderCharts();
                    },
                    function (err) {
                        console.log("goal.controller - deleteGoal - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to retrieve the goals for this user.";
                    }
                );
        }

        function selectGoal(goal) {
            vm._id = goal._id;
            vm.username = goal.username;
            vm.calories = goal.calories;
            vm.weight = goal.weight;
            vm.fat = goal.fat;
            vm.steps = goal.steps;
            vm.distance = goal.distance;
            vm.duration = goal.duration;
            vm.floors = goal.floors;
            vm.date = new Date(goal.date);
            vm.goalType = goal.type;
            vm.frequency = goal.frequency;
            vm.goalName = goal.name;
        }

        function doughnutLabels(goalType) {
            if (goalType == "calories") {
                return ["Burned", "Left"];
            } else if (goalType == 'weight') {
                return ["Current Weight", "To lose"];
            } else if (goalType == 'fat') {
                return ["Current Fat", "Left"];
            } else if (goalType == 'steps') {
                return ["Steps taken", "Left"];
            } else if (goalType == 'duration') {
                return ["Sleep duration", "Left"];
            } else if (goalType == 'floors') {
                return ["Floors climbed", "Left"];
            } else {
                return ["Distance covered", "Left"];
            }
        }

        function renderCharts() {
            for (var i = 0; i < vm.goals.length; i++) {
                if (vm.goals[i].type == 'calories') {
                    // calorie data
                    vm.goals[i].caloriesDoughnutLabels = ["Calories Burned", "Left"];
                    HealthLogService
                        .getSpecificHealthLogsForUser($rootScope.currentUser.username, 'calories', i)
                        .then(
                            function (doc) {
                                vm.calorieLogs = doc.data.res[0].healthdata;
                                var thisIndex = doc.data.resForIndex;

                                //console.log("goal.controller - init - getSpecificHealthLogsForUser: " + JSON.stringify(vm.goals));
                                if (vm.goals[thisIndex].frequency == 1) {
                                    vm.goals[thisIndex].aggregateCalorieData = [vm.calorieLogs[6].value, vm.goals[thisIndex].calories - vm.calorieLogs[6].value];
                                } else {
                                    var netVal = 0;
                                    for (var j = 0; j < vm.calorieLogs.length; j++) {
                                        netVal = netVal + vm.calorieLogs[j].value;
                                    }
                                    vm.goals[thisIndex].aggregateCalorieData = [netVal, (vm.goals[thisIndex].calories - netVal) > 0 ? (vm.goals[thisIndex].calories - netVal) : 0];
                                }
                            },
                            function (err) {
                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                //vm.goals[doc.data.resForIndex].aggregateCalorieData = [0, 100];
                                $rootScope.errorMessage = "Oh snap! We were unable to retrieve the calorie goals.";
                            }
                        );
                } else if (vm.goals[i].type == 'distance') {

                    // distance data
                    vm.goals[i].distanceDoughnutLabels = ["Steps taken", "Left"];
                    HealthLogService
                        .getSpecificHealthLogsForUser($rootScope.currentUser.username, 'distance', i)
                        .then(
                            function (doc) {
                                vm.distanceLogs = doc.data.res[0].healthdata;
                                var thisIndex = doc.data.resForIndex;

                                if (vm.goals[thisIndex].frequency == 1) {
                                    vm.goals[thisIndex].aggregateDistanceData = [vm.distanceLogs[6].value, vm.goals[thisIndex].distance - vm.distanceLogs[6].value];
                                } else {
                                    var netVal = 0;
                                    for (var j = 0; j < vm.distanceLogs.length; j++) {
                                        netVal = netVal + vm.distanceLogs[j].value;
                                    }
                                    vm.goals[thisIndex].aggregateDistanceData = [netVal, (vm.goals[thisIndex].distance - netVal) > 0 ? (vm.goals[thisIndex].distance - netVal) : 0];
                                }
                            },
                            function (err) {
                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                //vm.goals[thisIndex].aggregateDistanceData = [0, 100];
                                $rootScope.errorMessage = "Oh snap! We were unable to retrieve the distance goals.";
                            }
                        );
                } else if (vm.goals[i].type == 'floors') {
                    // floors data
                    vm.goals[i].floorsDoughnutLabels = ["Floors climbed", "Left"];
                    console.log("Floors goal");
                    HealthLogService
                        .getSpecificHealthLogsForUser($rootScope.currentUser.username, 'floors', i)
                        .then(
                            function (doc) {
                                vm.floorsLogs = doc.data.res[0].healthdata;
                                var thisIndex = doc.data.resForIndex;

                                if (vm.goals[thisIndex].frequency == 1) {
                                    vm.goals[thisIndex].aggregateFloorData = [vm.floorsLogs[6].value, vm.goals[thisIndex].floors - vm.floorsLogs[6].value];
                                } else {
                                    var netVal = 0;
                                    for (var j = 0; j < vm.floorsLogs.length; j++) {
                                        netVal = netVal + vm.floorsLogs[j].value;
                                    }
                                    vm.goals[thisIndex].aggregateFloorData = [netVal, (vm.goals[thisIndex].floors - netVal) > 0 ? (vm.goals[thisIndex].floors - netVal) : 0];
                                    console.log(JSON.stringify(vm.goals[thisIndex]));
                                }
                            },
                            function (err) {
                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                $rootScope.errorMessage = "Oh snap! We were unable to retrieve the floors goal.";
                            }
                        );
                } else {
                    // steps data
                    vm.goals[i].floorsDoughnutLabels = ["Steps taken", "Left"];
                    HealthLogService
                        .getSpecificHealthLogsForUser($rootScope.currentUser.username, 'steps', i)
                        .then(
                            function (doc) {
                                vm.stepsLogs = doc.data.res[0].healthdata;
                                var thisIndex = doc.data.resForIndex;

                                if (vm.goals[thisIndex].frequency == 1) {
                                    vm.goals[thisIndex].aggregateStepsData = [vm.stepsLogs[6].value, vm.goals[thisIndex].steps - vm.stepsLogs[6].value];
                                } else {
                                    var netVal = 0;
                                    for (var j = 0; j < vm.stepsLogs.length; j++) {
                                        netVal = netVal + vm.stepsLogs[j].value;
                                    }
                                    vm.goals[thisIndex].aggregateStepsData = [netVal, (vm.goals[thisIndex].steps - netVal) > 0 ? (vm.goals[thisIndex].steps - netVal) : 0];
                                }
                            },
                            function (err) {
                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                $rootScope.errorMessage = "Oh snap! We were unable to retrieve the steps goal.";
                            }
                        );
                }
            }
        }
    }
})();