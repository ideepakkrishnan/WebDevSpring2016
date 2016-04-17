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
                GoalService.findAllGoalsForUsername($rootScope.currentUser.username)
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
    }
})();