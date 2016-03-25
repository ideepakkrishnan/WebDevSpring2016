/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("GoalController", goalController);

    function goalController($rootScope, $location, GoalService) {
        var vm = this;

        function init() {
            /* Expose functions */
            vm.addGoal = addGoal;
            vm.updateGoal = updateGoal;
            vm.deleteGoal = deleteGoal;
            vm.selectGoal = selectGoal;

            /* Initialize global variables */
            if ($rootScope.currentUser) {
                GoalService.findAllGoals()
                    .then(
                        function (response) {
                            vm.goals = response.data;
                        },
                        function (err) {
                            console.log(err);
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
            var types = [];
            if (vm.weightGoal) {
                types.push("weight");
            }
            if (vm.sleepGoal) {
                types.push("sleep");
            }
            if (vm.activityGoal) {
                types.push("activity");
            }
            if (vm.fatGoal) {
                types.push("fat");
            }

            var newGoal = {
                "username": vm.username,
                "calories": vm.calories,
                "weight": vm.weight,
                "fat": vm.fat,
                "steps": vm.steps,
                "distance": vm.distance,
                "duration": vm.duration,
                "floors": vm.floors,
                "date": (new Date(vm.date)).formatDDMMMYYYY(),
                "type": types
            };

            GoalService.createGoal(newGoal)
                .then(
                    function(response) {
                        console.log(response);
                        vm.goals = response.data;
                        vm.username = "";
                        vm.calories = "";
                        vm.weight = "";
                        vm.fat = "";
                        vm.steps = "";
                        vm.distance = "";
                        vm.duration = "";
                        vm.floors = "";
                        vm.date = "";
                        vm.weightGoal = false;
                        vm.sleepGoal = false;
                        vm.activityGoal = false;
                        vm.fatGoal = false;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function updateGoal() {
            var types = [];
            if (vm.weightGoal) {
                types.push("weight");
            }
            if (vm.sleepGoal) {
                types.push("sleep");
            }
            if (vm.activityGoal) {
                types.push("activity");
            }
            if (vm.fatGoal) {
                types.push("fat");
            }

            var updatedGoal = {
                "username": vm.username,
                "calories": vm.calories,
                "weight": vm.weight,
                "fat": vm.fat,
                "steps": vm.steps,
                "distance": vm.distance,
                "duration": vm.duration,
                "floors": vm.floors,
                "date": (new Date(vm.date)).formatDDMMMYYYY(),
                "type": types
            };

            GoalService.updateGoal(vm._id, updatedGoal)
                .then(
                    function(response) {
                        console.log(response);
                        vm.goals = response.data;
                        vm._id = -1;
                        vm.username = "";
                        vm.calories = "";
                        vm.weight = "";
                        vm.fat = "";
                        vm.steps = "";
                        vm.distance = "";
                        vm.duration = "";
                        vm.floors = "";
                        vm.date = "";
                        vm.weightGoal = false;
                        vm.sleepGoal = false;
                        vm.activityGoal = false;
                        vm.fatGoal = false;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function deleteGoal(goalId) {
            GoalService.deleteGoalById(goalId)
                .then(
                    function(response) {
                        console.log(response);
                        vm.goals = response.data;
                    },
                    function (err) {
                        console.log(err);
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
            vm.weightGoal = goal.type.indexOf('weight') >= 0;
            vm.sleepGoal = goal.type.indexOf('sleep') >= 0;
            vm.activityGoal = goal.type.indexOf('activity') >= 0;
            vm.fatGoal = goal.type.indexOf('fat') >= 0;
        }
    }
})();