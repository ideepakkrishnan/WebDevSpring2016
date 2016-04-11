/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

(function () {
    "use strict";

    angular
        .module("PerformXApp")
        .factory("TeamService", teamService);

    function teamService($http) {
        var api = {
            fetchTeamDetails: fetchTeamDetails,
            findUsersByTeam: findUsersByTeam,
            createTeam: createTeam,
            updateTeamById: updateTeamById,
            deleteTeamById: deleteTeamById
        };
        return api;

        function fetchTeamDetails(teamIdList) {
            return $http.get("/api/project/team/" + teamIdList);
        }

        function findUsersByTeam(teamId) {
            return $http.get("/api/project/team/" + teamId + "/user");
        }

        function createTeam(teamDetails) {
            return $http.post("/api/project/team", teamDetails);
        }

        function updateTeamById(teamId, team) {
            return $http.put("/api/project/team/" + teamId, team);
        }

        function deleteTeamById(teamId) {
            return $http.delete("/api/project/team/" + teamId);
        }
    }
})();