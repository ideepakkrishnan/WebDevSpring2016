/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("DataModelApp")
        .controller("FatController", fatController);

    function fatController($scope, HealthDataService) {
        /* Expose functions */
        $scope.addFatLog = addFatLog;
        $scope.updateFatLog = updateFatLog;
        $scope.deleteFatLog = deleteFatLog;
        $scope.selectFatLog = selectFatLog;

        /* Initialize global variables */
        HealthDataService.findAllFatInstances(
            function(response) {
                $scope.fatLogs = response;
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

        function addFatLog() {
            HealthDataService.createFatInstance(
                {"username": $scope.username, "fat": $scope.fat, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope.fatLogs = response;
                    $scope.username = "";
                    $scope.fat = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function updateFatLog() {
            HealthDataService.updateFatInstance(
                $scope._id,
                {"username": $scope.username, "fat": $scope.fat, "date": (new Date($scope.loggedDate)).formatDDMMMYYYY()},
                function(response) {
                    console.log(response);
                    $scope._id = -1;
                    $scope.fatLogs = response;
                    $scope.username = "";
                    $scope.fat = "";
                    $scope.loggedDate = "";
                }
            )
        }

        function deleteFatLog(fatLogId) {
            HealthDataService.deleteFatInstanceById(
                fatLogId,
                function(response) {
                    console.log(response);
                    $scope.fatLogs = response;
                }
            )
        }

        function selectFatLog(instance) {
            $scope._id = instance._id;
            $scope.username = instance.username;
            $scope.fat = instance.fat;
            $scope.loggedDate = new Date(instance.date);
        }
    }
})();