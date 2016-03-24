/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

var mock = require("./team.mock.json");

module.exports = function () {
    var api = {
        fetchTeamDetails: fetchTeamDetails
    };
    return api;

    function fetchTeamDetails(teamIdList) {
        var response = [];
        for (var i=0; i<teamIdList.length; i++) {
            var teamDetails = mock[teamIdList[i]];
            teamDetails["teamId"] = teamIdList[i];
            response.push(teamDetails);
        }
        return response;
    }
};