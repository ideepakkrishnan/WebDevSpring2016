/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("DataModelApp")
        .controller("HeartRateController", heartRateController);

    function heartRateController($scope, HealthDataService) {
        /* Expose functions */
        $scope.addHeartRateLog = addHeartRateLog;
        $scope.updateHeartRateLog = updateHeartRateLog;
        $scope.deleteHeartRateLog = deleteHeartRateLog;
        $scope.selectHeartRateLog = selectHeartRateLog;

        /* Initialize global variables */
        HealthDataService.findAllHeartRateInstances(
            function(response) {
                $scope.heartRateLogs = response;
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

        function addHeartRateLog() {
            HealthDataService.createHeartRateInstance(
                {"username": $scope.username, "rate": $scope.rate, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope.heartRateLogs = response;
                    $scope.username = "";
                    $scope.rate = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function updateHeartRateLog() {
            HealthDataService.updateHeartRateInstance(
                $scope._id,
                {"username": $scope.username, "rate": $scope.rate, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope._id = -1;
                    $scope.heartRateLogs = response;
                    $scope.username = "";
                    $scope.rate = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function deleteHeartRateLog(heartRateLogId) {
            HealthDataService.deleteHeartRateInstanceById(
                heartRateLogId,
                function(response) {
                    console.log(response);
                    $scope.heartRateLogs = response;
                }
            )
        }

        function selectHeartRateLog(instance) {
            $scope._id = instance._id;
            $scope.username = instance.username;
            $scope.rate = instance.rate;
            $scope.loggedDate = new Date(instance.date);
        }
    }
})();