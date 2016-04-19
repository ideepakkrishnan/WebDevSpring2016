/**
 * Created by ideepakkrishnan on 18-04-2016.
 */

(function () {
    "use strict";

    angular
        .module("PerformXApp")
        .factory("HealthLogService", healthLogService);

    function healthLogService($http) {
        var api = {
            createHealthLog: createHealthLog,
            getHealthLogsForUser: getHealthLogsForUser,
            getSpecificHealthLogsForUser: getSpecificHealthLogsForUser,
            getAllHealthLogs: getAllHealthLogs,
            updateHealthLogById: updateHealthLogById,
            deleteHealthLogById: deleteHealthLogById
        };
        return api;

        function createHealthLog(healthData) {
            return $http.post("/api/project/healthLog", healthData);
        }

        function getHealthLogsForUser(username) {
            return $http.get("/api/project/healthLog/user/" + username);
        }

        function getSpecificHealthLogsForUser(username, type, i) {
            return $http.get("/api/project/healthLog/user/" + username + "/" + type + "/" + i);
        }

        function getAllHealthLogs() {
            return $http.get("/api/project/healthLog");
        }

        function updateHealthLogById(healthLogId, healthData) {
            return $http.put("/api/project/healthLog/" + healthLogId, healthData);
        }

        function deleteHealthLogById(healthLogId) {
            return $http.delete("/api/project/healthLog/" + healthLogId);
        }
    }
})();