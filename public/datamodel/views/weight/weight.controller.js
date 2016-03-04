/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("DataModelApp")
        .controller("WeightController", weightController);

    function weightController($scope, HealthDataService) {
        /* Expose functions */
        $scope.addWeightLog = addWeightLog;
        $scope.updateWeightLog = updateWeightLog;
        $scope.deleteWeightLog = deleteWeightLog;
        $scope.selectWeightLog = selectWeightLog;

        /* Initialize global variables */
        HealthDataService.findAllWeightInstances(
            function(response) {
                $scope.weightLogs = response;
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

        function addWeightLog() {
            HealthDataService.createWeightInstance(
                {"username": $scope.username, "bmi": $scope.bmi, "fat": $scope.fat, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope.weightLogs = response;
                    $scope.username = "";
                    $scope.bmi = "";
                    $scope.fat = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function updateWeightLog() {
            HealthDataService.updateWeightInstance(
                $scope._id,
                {"username": $scope.username, "bmi": $scope.bmi, "fat": $scope.fat, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope._id = -1;
                    $scope.weightLogs = response;
                    $scope.username = "";
                    $scope.bmi = "";
                    $scope.fat = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function deleteWeightLog(weightLogId) {
            HealthDataService.deleteWeightInstanceById(
                weightLogId,
                function(response) {
                    console.log(response);
                    $scope.weightLogs = response;
                }
            )
        }

        function selectWeightLog(instance) {
            $scope._id = instance._id;
            $scope.username = instance.username;
            $scope.bmi = instance.bmi;
            $scope.fat = instance.fat;
            $scope.loggedDate = new Date(instance.date);
        }
    }
})();