/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("GoalController", goalController);

    function goalController($rootScope, UserService, GoalService, HealthLogService) {
        var vm = this;

        function init() {
            vm.goals = [];
            vm.rootScope = $rootScope;

            /* Expose functions */
            vm.addGoal = addGoal;
            vm.updateGoal = updateGoal;
            vm.deleteGoal = deleteGoal;
            vm.selectGoal = selectGoal;
            vm.doughnutLabels = doughnutLabels;
            
            UserService
                .getCurrentUser()
                .then(
                    function (currUser) {
                        vm.currUser = currUser.data;
                        vm.currUsername = currUser.data.username;
                        return GoalService.findAllGoalsForUsername(vm.currUsername);
                    },
                    function (err) {
                        $rootScope.errorMessage = "You should be logged in!";
                    }
                )
                .then(
                    function (response) {
                        vm.goals = response.data;
                        renderCharts();
                    },
                    function (err) {
                        console.log("goal.controller - init error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to save the goal. Please try again.";
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
                "username": vm.currUsername,
                "assignedBy": vm.currUsername,
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
                        return GoalService.findAllGoalsForUsername(vm.currUsername);
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
                "username": vm.currUsername,
                "assignedBy": vm.currUsername,
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
                        return GoalService.findAllGoalsForUsername(vm.currUsername);
                    },
                    function (err) {
                        console.log("goal.controller - updateGoal - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to update the goal. Please try again.";
                    }
                )
                .then(
                    function (doc) {
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
                        $rootScope.errorMessage = "Oh snap! We were unable to retrieve your goals.";
                    }
                );
        }

        function deleteGoal(goalId) {
            GoalService
                .deleteGoalById(goalId)
                .then(
                    function(response) {
                        return GoalService.findAllGoalsForUsername(vm.currUsername);
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
                        $rootScope.errorMessage = "Oh snap! We were unable to retrieve your goals.";
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
                        .getSpecificHealthLogsForUser(vm.currUsername, 'calories', i)
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
                                $rootScope.errorMessage = "Oh snap! We were unable to get the calorie goals for this user.";
                            }
                        );
                } else if (vm.goals[i].type == 'distance') {

                    // distance data
                    vm.goals[i].distanceDoughnutLabels = ["Steps taken", "Left"];
                    HealthLogService
                        .getSpecificHealthLogsForUser(vm.currUsername, 'distance', i)
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
                                $rootScope.errorMessage = "Oh snap! We were unable to get the distance goals for this user.";
                            }
                        );
                } else if (vm.goals[i].type == 'floors') {
                    // floors data
                    vm.goals[i].floorsDoughnutLabels = ["Floors climbed", "Left"];
                    console.log("Floors goal");
                    HealthLogService
                        .getSpecificHealthLogsForUser(vm.currUsername, 'floors', i)
                        .then(
                            function (doc) {
                                console.log("goal.controller floors goal - " + JSON.stringify(doc));
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
                                $rootScope.errorMessage = "Oh snap! We were unable to get the floors goals for this user.";
                            }
                        );
                } else {
                    // steps data
                    vm.goals[i].floorsDoughnutLabels = ["Steps taken", "Left"];
                    HealthLogService
                        .getSpecificHealthLogsForUser(vm.currUsername, 'steps', i)
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
                                    console.log(JSON.stringify(vm.goals[thisIndex]));
                                }
                            },
                            function (err) {
                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                $rootScope.errorMessage = "Oh snap! We were unable to get the steps goals for this user.";
                            }
                        );
                }
            }
        }
    }
})();