/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("GoalController", goalController);

    function goalController($scope, $rootScope, $location, GoalService) {
        /* Expose functions */
        $scope.addGoal = addGoal;
        $scope.updateGoal = updateGoal;
        $scope.deleteGoal = deleteGoal;
        $scope.selectGoal = selectGoal;

        /* Initialize global variables */
        if ($rootScope.currentUser) {
            GoalService.findAllGoals()
                .then(
                    function (response) {
                        $scope.goals = response;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        } else {
            $location.path("#/home");
        }

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
            if ($scope.weightGoal) {
                types.push("weight");
            }
            if ($scope.sleepGoal) {
                types.push("sleep");
            }
            if ($scope.activityGoal) {
                types.push("activity");
            }
            if ($scope.fatGoal) {
                types.push("fat");
            }

            var newGoal = {
                "username": $scope.username,
                "calories": $scope.calories,
                "weight": $scope.weight,
                "fat": $scope.fat,
                "steps": $scope.steps,
                "distance": $scope.distance,
                "duration": $scope.duration,
                "floors": $scope.floors,
                "date": (new Date($scope.date)).formatDDMMMYYYY(),
                "type": types
            };

            GoalService.createGoal(newGoal)
                .then(
                    function(response) {
                        console.log(response);
                        $scope.goals = response;
                        $scope.username = "";
                        $scope.calories = "";
                        $scope.weight = "";
                        $scope.fat = "";
                        $scope.steps = "";
                        $scope.distance = "";
                        $scope.duration = "";
                        $scope.floors = "";
                        $scope.date = "";
                        $scope.weightGoal = false;
                        $scope.sleepGoal = false;
                        $scope.activityGoal = false;
                        $scope.fatGoal = false;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function updateGoal() {
            var types = [];
            if ($scope.weightGoal) {
                types.push("weight");
            }
            if ($scope.sleepGoal) {
                types.push("sleep");
            }
            if ($scope.activityGoal) {
                types.push("activity");
            }
            if ($scope.fatGoal) {
                types.push("fat");
            }

            var updatedGoal = {
                "username": $scope.username,
                "calories": $scope.calories,
                "weight": $scope.weight,
                "fat": $scope.fat,
                "steps": $scope.steps,
                "distance": $scope.distance,
                "duration": $scope.duration,
                "floors": $scope.floors,
                "date": (new Date($scope.date)).formatDDMMMYYYY(),
                "type": types
            };

            GoalService.updateGoal($scope._id, updatedGoal)
                .then(
                    function(response) {
                        console.log(response);
                        $scope.goals = response;
                        $scope._id = -1;
                        $scope.username = "";
                        $scope.calories = "";
                        $scope.weight = "";
                        $scope.fat = "";
                        $scope.steps = "";
                        $scope.distance = "";
                        $scope.duration = "";
                        $scope.floors = "";
                        $scope.date = "";
                        $scope.weightGoal = false;
                        $scope.sleepGoal = false;
                        $scope.activityGoal = false;
                        $scope.fatGoal = false;
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
                        $scope.goals = response;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function selectGoal(goal) {
            $scope._id = goal._id;
            $scope.username = goal.username;
            $scope.calories = goal.calories;
            $scope.weight = goal.weight;
            $scope.fat = goal.fat;
            $scope.steps = goal.steps;
            $scope.distance = goal.distance;
            $scope.duration = goal.duration;
            $scope.floors = goal.floors;
            $scope.date = new Date(goal.date);
            $scope.weightGoal = goal.type.indexOf('weight') >= 0;
            $scope.sleepGoal = goal.type.indexOf('sleep') >= 0;
            $scope.activityGoal = goal.type.indexOf('activity') >= 0;
            $scope.fatGoal = goal.type.indexOf('fat') >= 0;
        }
    }
})();