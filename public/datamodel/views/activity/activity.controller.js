/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("DataModelApp")
        .controller("ActivityController", activityController);

    function activityController($scope, HealthDataService) {
        /* Expose functions */
        $scope.addActivityLog = addActivityLog;
        $scope.updateActivityLog = updateActivityLog;
        $scope.deleteActivityLog = deleteActivityLog;
        $scope.selectActivityLog = selectActivityLog;

        /* Initialize global variables */
        HealthDataService.findAllActivityInstances(
            function(response) {
                $scope.activityLogs = response;
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

        function addActivityLog() {
            HealthDataService.createActivityInstance(
                {"username": $scope.username, "calories": $scope.calories, "steps": $scope.steps, "distance": $scope.distance,
                    "duration": $scope.duration, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope.activityLogs = response;
                    $scope.username = "";
                    $scope.calories = "";
                    $scope.steps = "";
                    $scope.distance = "";
                    $scope.duration = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function updateActivityLog() {
            HealthDataService.updateActivityInstance(
                $scope._id,
                {"username": $scope.username, "calories": $scope.calories, "steps": $scope.steps, "distance": $scope.distance,
                    "duration": $scope.duration, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope._id = -1;
                    $scope.activityLogs = response;
                    $scope.username = "";
                    $scope.calories = "";
                    $scope.steps = "";
                    $scope.distance = "";
                    $scope.duration = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function deleteActivityLog(activityLogId) {
            HealthDataService.deleteActivityInstanceById(
                activityLogId,
                function(response) {
                    console.log(response);
                    $scope.activityLogs = response;
                }
            )
        }

        function selectActivityLog(instance) {
            $scope._id = instance._id;
            $scope.username = instance.username;
            $scope.duration = instance.duration;
            $scope.calories = instance.calories;
            $scope.steps = instance.steps;
            $scope.distance = instance.distance;
            $scope.loggedDate = new Date(instance.date);
        }
    }
})();