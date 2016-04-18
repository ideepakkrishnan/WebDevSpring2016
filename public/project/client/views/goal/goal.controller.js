/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("GoalController", goalController);

    function goalController($rootScope, $location, GoalService, HealthLogService) {
        var vm = this;

        function init() {
            /* Expose functions */
            vm.addGoal = addGoal;
            vm.updateGoal = updateGoal;
            vm.deleteGoal = deleteGoal;
            vm.selectGoal = selectGoal;
            vm.doughnutLabels = doughnutLabels;

            /* Initialize global variables */
            if ($rootScope.currentUser) {
                GoalService
                    .findAllGoalsForUsername($rootScope.currentUser.username)
                    .then(
                        function (response) {
                            vm.goals = response.data;
                            for (var i = 0; i < vm.goals.length; i++) {
                                vm.currIndex = i;
                                if (vm.goals[i].type == 'calories') {
                                    // calorie data
                                    vm.goals[i].caloriesDoughnutLabels = ["Calories Burned", "Left"];
                                    HealthLogService
                                        .getSpecificHealthLogsForUser($rootScope.currentUser.username, 'calories')
                                        .then(
                                            function (doc) {
                                                vm.calorieLogs = doc.data[0].healthdata;

                                                console.log("goal.controller - init - getSpecificHealthLogsForUser: " + JSON.stringify(vm.goals));
                                                if (vm.goals[vm.currIndex].frequency == 1) {
                                                    vm.goals[vm.currIndex].aggregateCalorieData = [vm.calorieLogs[6].value, goals[vm.currIndex].calories - vm.calorieLogs[6].value];
                                                } else {
                                                    var netVal = 0;
                                                    for (var j = 0; j < vm.calorieLogs.length; j++) {
                                                        netVal = netVal + vm.calorieLogs[j].value;
                                                    }
                                                    vm.goals[vm.currIndex].aggregateCalorieData = [netVal, (vm.goals[vm.currIndex].calories - netVal) > 0 ? (vm.goals[vm.currIndex].calories - netVal) : 0];
                                                    console.log(JSON.stringify(vm.goals[vm.currIndex]));
                                                }
                                            },
                                            function (err) {
                                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                                vm.goals[vm.currIndex].aggregateCalorieData = [0, 100];
                                            }
                                        );
                                } else if (vm.goals[i].type == 'distance') {

                                    // distance data
                                    vm.goals[i].distanceDoughnutLabels = ["Steps taken", "Left"];
                                    HealthLogService
                                        .getSpecificHealthLogsForUser($rootScope.currentUser.username, 'distance')
                                        .then(
                                            function (doc) {
                                                vm.distanceLogs = doc.data[0].healthdata;

                                                if (vm.goals[vm.currIndex].frequency == 1) {
                                                    vm.goals[vm.currIndex].aggregateDistanceData = [vm.distanceLogs[6].value, vm.goals[vm.currIndex].distance - vm.distanceLogs[6].value];
                                                } else {
                                                    var netVal = 0;
                                                    for (var j = 0; j < vm.distanceLogs.length; j++) {
                                                        netVal = netVal + vm.distanceLogs[j].value;
                                                    }
                                                    vm.goals[vm.currIndex].aggregateDistanceData = [netVal, (vm.goals[vm.currIndex].distance - netVal) > 0 ? (vm.goals[vm.currIndex].distance - netVal) : 0];
                                                    console.log(JSON.stringify(vm.goals[vm.currIndex]));
                                                }
                                            },
                                            function (err) {
                                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                                vm.goals[vm.currIndex].aggregateDistanceData = [0, 100];
                                            }
                                        );
                                } else if (vm.goals[i].type == 'floors') {
                                    // floors data
                                    vm.goals[i].floorsDoughnutLabels = ["Floors climbed", "Left"];
                                    HealthLogService
                                        .getSpecificHealthLogsForUser($rootScope.currentUser.username, 'floors')
                                        .then(
                                            function (doc) {
                                                vm.floorsLogs = doc.data[0].healthdata;

                                                if (vm.goals[vm.currIndex].frequency == 1) {
                                                    vm.goals[vm.currIndex].aggregateFloorData = [vm.floorsLogs[6].value, vm.goals[vm.currIndex].floors - vm.floorsLogs[6].value];
                                                } else {
                                                    var netVal = 0;
                                                    for (var j = 0; j < vm.floorsLogs.length; j++) {
                                                        netVal = netVal + vm.floorsLogs[j].value;
                                                    }
                                                    vm.goals[vm.currIndex].aggregateFloorData = [netVal, (vm.goals[vm.currIndex].floors - netVal) > 0 ? (vm.goals[vm.currIndex].floors - netVal) : 0];
                                                    console.log(JSON.stringify(vm.goals[vm.currIndex]));
                                                }
                                            },
                                            function (err) {
                                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                                vm.goals[vm.currIndex].aggregateFloorData = [0, 100];
                                            }
                                        );
                                } else {
                                    // steps data
                                    vm.goals[i].floorsDoughnutLabels = ["Steps taken", "Left"];
                                    HealthLogService
                                        .getSpecificHealthLogsForUser($rootScope.currentUser.username, 'steps')
                                        .then(
                                            function (doc) {
                                                vm.stepsLogs = doc.data[0].healthdata;

                                                if (vm.goals[vm.currIndex].frequency == 1) {
                                                    vm.goals[vm.currIndex].aggregateStepsData = [vm.stepsLogs[6].value, vm.goals[vm.currIndex].steps - vm.stepsLogs[6].value];
                                                } else {
                                                    var netVal = 0;
                                                    for (var j = 0; j < vm.stepsLogs.length; j++) {
                                                        netVal = netVal + vm.stepsLogs[j].value;
                                                    }
                                                    vm.goals[vm.currIndex].aggregateStepsData = [netVal, (vm.goals[vm.currIndex].steps - netVal) > 0 ? (vm.goals[vm.currIndex].steps - netVal) : 0];
                                                    console.log(JSON.stringify(vm.goals[vm.currIndex]));
                                                }
                                            },
                                            function (err) {
                                                console.log("goal.controller - getSpecificHealthLogsForUser - error: " + err.message);
                                                vm.goals[vm.currIndex].aggregateStepsData = [0, 100];
                                            }
                                        );
                                }
                            }
                        },
                        function (err) {
                            console.log("Error: " + err.message);
                        }
                    );
            } else {
                $location.path("#/home");
            }
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
                "username": $rootScope.currentUser.username,
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
                        console.log("goal.controller - addGoal - created goal: " + JSON.stringify(response));
                        return GoalService.findAllGoalsForUsername($rootScope.currentUser.username);
                    },
                    function (err) {
                        console.log("goal.controller - addGoal - error: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        console.log("goal.controller - user goals: " + JSON.stringify(doc));
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
                    }
                );
        }

        function updateGoal() {
            var updatedGoal = {
                "name": vm.goalName,
                "username": $rootScope.currentUser.username,
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
                        console.log("goal.controller - updateGoal - created goal: " + JSON.stringify(response));
                        return GoalService.findAllGoalsForUsername($rootScope.currentUser.username);
                    },
                    function (err) {
                        console.log("goal.controller - updateGoal - error: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        console.log("goal.controller - updateGoal - user goals: " + JSON.stringify(doc));
                        vm.goals = doc.data;
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
                    }
                );
        }

        function deleteGoal(goalId) {
            GoalService
                .deleteGoalById(goalId)
                .then(
                    function(response) {
                        console.log("goal.controller - deleteGoal - deleted goal: " + JSON.stringify(response));
                        return GoalService.findAllGoalsForUsername($rootScope.currentUser.username);
                    },
                    function (err) {
                        console.log("goal.controller - deleteGoal - error: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        console.log("goal.controller - deleteGoal - user goals: " + JSON.stringify(doc));
                        vm.goals = doc.data;
                    },
                    function (err) {
                        console.log("goal.controller - deleteGoal - error: " + err.message);
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
    }
})();