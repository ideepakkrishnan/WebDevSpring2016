/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

//var mock = require("./team.mock.json");
var q = require("q");

module.exports = function () {

    var TeamSchema = require("./team.schema.server.js")(mongoose);
    var UserSchema = require("./user.schema.server.js")(mongoose);

    var TeamModel = mongoose.model('team', TeamSchema);
    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        fetchTeamDetails: fetchTeamDetails,
        findUsersByTeam: findUsersByTeam
    };
    return api;

    function fetchTeamDetails(teamIdList) {
        var deferred = q.defer();

        TeamModel.find({
            teamId: {$in: teamIdList}
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
                UserModel.find({userId: {$in: doc.data}}, function (err, res) {
                    if (err) {
                        console.log("team.model: findUsersByTeam - error > " + err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(res);
                    }
                })
            }
        });

        return deferred.promise;
    }
};