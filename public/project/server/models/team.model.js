/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

//var mock = require("./team.mock.json");
var q = require("q");

module.exports = function (db, mongoose, userModel) {

    var TeamSchema = require("./team.schema.server.js")(mongoose);

    var TeamModel = mongoose.model('performXteam', TeamSchema);

    var api = {
        fetchTeamDetails: fetchTeamDetails,
        findUsersByTeam: findUsersByTeam,
        createTeam: createTeam,
        updateTeam: updateTeam,
        deleteTeam: deleteTeam
    };
    return api;

    function createTeam(team) {
        var deferred = q.defer();

        TeamModel.create(team, function (err, doc) {
            if (err) {
                console.log("team.model: createTeam - error > " + err);
                deferred.reject(err);
            } else {
                console.log("team.model: createTeam - result > " + JSON.stringify(doc.data));
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateTeam(teamId, team) {
        var deferred = q.defer();

        TeamModel.findByIdAndUpdate(
            teamId,
            {$set: {
                name: team.name,
                description: team.description,
                image: team.image,
                users: team.users
            }},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("team.model: updateTeam - error > " + err);
                    deferred.reject(err);
                } else {
                    console.log("team.model: updateTeam - result > " + JSON.stringify(doc.data));
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function deleteTeam(teamId) {
        var deferred = q.defer();

        TeamModel.findByIdAndRemove(teamId, function (err, doc) {
            if (err) {
                console.log("team.model: deleteTeam - error > " + err);
                deferred.reject(err);
            } else {
                console.log("team.model - deleteTeam - findByIdAndRemove result: " + JSON.stringify(doc));
                userModel.deleteTeamAffiliation(doc.users, teamId).then(
                    function (doc) {
                        console.log("team.model - deleteTeam - deleteTeamAffiliation result: " + JSON.stringify(doc));
                        deferred.resolve(doc);
                    },
                    function (err) {
                        console.log("team.model: deleteTeam - error > " + err);
                        deferred.reject(err);
                    }
                );
            }
        });

        return deferred.promise;
    }

    function fetchTeamDetails(teamIdList) {
        var deferred = q.defer();

        TeamModel.find({
            _id: {$in: teamIdList}
        }, function (err, doc) {
            if (err) {
                console.log("team.model: fetchTeamDetails - error > " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUsersByTeam(teamId) {
        var deferred = q.defer();

        TeamModel.findById(teamId, 'users', function (err, doc) {
            if (err) {
                console.log("team.model: findUsersByTeam - error > " + err);
                deferred.reject(err);
            } else {
                console.log("team.model: findUsersByTeam - result > " + JSON.stringify(doc.data));
                userModel.retrieveDataForAllUsers(doc.data).then(
                    function (res) {
                        deferred.resolve(res);
                    },
                    function (err) {
                        deferred.reject(err);
                    });
            }
        });

        return deferred.promise;
    }
};