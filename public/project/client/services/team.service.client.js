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
            findUsersByTeam: findUsersByTeam
        };
        return api;

        function fetchTeamDetails(teamIdList) {
            return $http.get("/api/project/team/" + teamIdList);
        }

        function findUsersByTeam(teamId) {
            return $http.get("/api/project/team/" + teamId + "/user");
        }
    }
})();