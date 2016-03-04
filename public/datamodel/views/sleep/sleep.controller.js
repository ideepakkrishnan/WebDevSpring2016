/**
 * Created by ideepakkrishnan on 03-03-2016.
 */

(function () {
    angular
        .module("DataModelApp")
        .controller("SleepController", sleepController);

    function sleepController($scope, HealthDataService) {
        /* Expose functions */
        $scope.addSleepLog = addSleepLog;
        $scope.updateSleepLog = updateSleepLog;
        $scope.deleteSleepLog = deleteSleepLog;
        $scope.selectSleepLog = selectSleepLog;

        /* Initialize global variables */
        HealthDataService.findAllSleepInstances(
            function(response) {
                $scope.sleepInstances = response;
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

        function addSleepLog() {
            HealthDataService.createSleepInstance(
                {"username": $scope.username, "duration": $scope.duration, "restlessDuration": $scope.restlessDuration,
                    "timeInBed": $scope.timeInBed, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope.sleepInstances = response;
                    $scope.username = "";
                    $scope.duration = "";
                    $scope.restlessDuration = "";
                    $scope.timeInBed = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function updateSleepLog() {
            HealthDataService.updateSleepInstance(
                $scope._id,
                {"username": $scope.username, "duration": $scope.duration, "restlessDuration": $scope.restlessDuration,
                    "timeInBed": $scope.timeInBed, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope._id = -1;
                    $scope.sleepInstances = response;
                    $scope.username = "";
                    $scope.duration = "";
                    $scope.restlessDuration = "";
                    $scope.timeInBed = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function deleteSleepLog(sleepLogId) {
            HealthDataService.deleteSleepInstanceById(
                sleepLogId,
                function(response) {
                    console.log(response);
                    $scope.sleepInstances = response;
                }
            )
        }

        function selectSleepLog(instance) {
            $scope._id = instance._id;
            $scope.username = instance.username;
            $scope.duration = instance.duration;
            $scope.restlessDuration = instance.restlessDuration;
            $scope.timeInBed = instance.timeInBed;
            $scope.loggedDate = new Date(instance.date);
        }
    }
})();