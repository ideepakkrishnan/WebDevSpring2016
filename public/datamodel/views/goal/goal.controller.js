/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("DataModelApp")
        .controller("GoalController", goalController);

    function goalController($scope, HealthDataService) {
        /* Expose functions */
        $scope.addGoal = addGoal;
        $scope.updateGoal = updateGoal;
        $scope.deleteGoal = deleteGoal;
        $scope.selectGoal = selectGoal;

        /* Initialize global variables */
        HealthDataService.findAllGoals(
            function(response) {
                $scope.goals = response;
            }
        );

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
        }

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
            HealthDataService.createGoal(
                {"username": $scope.username, "calories": $scope.calories, "weight": $scope.weight, "fat": $scope.fat,
                    "steps": $scope.steps, "distance": $scope.distance, "duration": $scope.duration, "floors": $scope.floors,
                    "date": (new Date($scope.date)).formatDDMMMYYYY(), "type": types},
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
                }
            )
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
            HealthDataService.updateGoal(
                $scope._id,
                {"username": $scope.username, "calories": $scope.calories, "weight": $scope.weight, "fat": $scope.fat,
                    "steps": $scope.steps, "distance": $scope.distance, "duration": $scope.duration, "floors": $scope.floors,
                    "date": (new Date($scope.date)).formatDDMMMYYYY(), "type": types},
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
                }
            )
        }

        function deleteGoal(goalId) {
            HealthDataService.deleteGoalById(
                goalId,
                function(response) {
                    console.log(response);
                    $scope.goals = response;
                }
            )
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