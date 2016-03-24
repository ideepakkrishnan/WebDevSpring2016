/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function (app, teamModel) {
    app.get("/api/project/user/team", getTeamDetails);

    function getTeamDetails(req, res) {
        var teamIds = req.body;
        var teamDetails = teamModel.fetchTeamDetails(teamIds);
        res.json(teamDetails);
    }
};