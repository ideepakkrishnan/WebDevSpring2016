/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function (app, teamModel) {
    app.get("/api/project/team/:idList", getTeamDetails);
    app.get("/api/project/team/:id/user", getUsersByTeam);

    function getTeamDetails(req, res) {
        var teamIds = req.params.idList;
        var teamDetails = teamModel.fetchTeamDetails(teamIds);
        res.json(teamDetails);
    }

    function getUsersByTeam(req, res) {
        var teamId = req.params.id;
        var users = teamModel.findUsersByTeam(teamId);
        res.json(users);
    }
};