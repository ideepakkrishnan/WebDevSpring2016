/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function (app, teamModel) {
    app.post("/api/project/team", createTeam);
    app.put("/api/project/team/:id", updateTeamById);
    app.get("/api/project/team/search/:name", searchForTeam);
    app.delete("/api/project/team/:id", deleteTeamById);
    app.get("/api/project/team/:idList", getTeamDetails);
    app.get("/api/project/team/:id/user", getUsersByTeam);
    app.put("/api/project/team/:id/:username", addTeamMember);
    app.delete("/api/project/team/:id/:username", deleteTeamMember);

    function getTeamDetails(req, res) {
        var teamIds = req.params.idList.split(',');
        var teamDetails = teamModel.fetchTeamDetails(teamIds)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUsersByTeam(req, res) {
        var teamId = req.params.id;
        var users = teamModel.findUsersByTeam(teamId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createTeam(req, res) {
        var teamDetails = req.body;
        var newTeam = teamModel.createTeam(teamDetails)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateTeamById(req, res) {
        var teamId = req.params.id;
        var team = req.body;
        var updatedTeam = teamModel.updateTeam(teamId, team)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteTeamById(req, res) {
        var teamId = req.params.id;
        var result = teamModel.deleteTeam(teamId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addTeamMember(req, res) {
        var teamId = req.params.id;
        var username = req.params.username;
        teamModel.addTeamMember(teamId, username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteTeamMember(req, res) {
        var teamId = req.params.id;
        var username = req.params.username;
        teamModel.deleteTeamMember(teamId, username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function searchForTeam(req, res) {
        var name = req.params.name;
        teamModel.searchForTeamName(name)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};