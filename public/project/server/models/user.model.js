/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

//var mock = require("./user.mock.json");
var q = require("q");

module.exports = function (db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('performXuser', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        updateFitbitConnDetails: updateFitbitConnDetails,
        addPersonalGoal: addPersonalGoal,
        retrievePersonalGoals: retrievePersonalGoals,
        removePersonalGoal: removePersonalGoal,
        retrieveDataForAllUsers: retrieveDataForAllUsers,
        addTeamAffiliation: addTeamAffiliation,
        deleteTeamAffiliation: deleteTeamAffiliation,
        addSubscriber: addSubscriber,
        deleteSubscriber: deleteSubscriber,
        addToWatching: addToWatching,
        deleteFromWatching: deleteFromWatching
    };
    return api;

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        UserModel.findOne({username: username, password: password}, function (err, doc) {
            if (err) {
                console.log("user.model: findUserByCredentials - error > " + err);
                deferred.reject(err);
            } else {
                console.log("user.model: findUserByCredentials - result > " + JSON.stringify(doc.data));
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find({}, function (err, doc) {
            if (err) {
                console.log("user.model: findAllUsers - error > " + err);
                deferred.reject(err);
            } else {
                console.log("user.model: findAllUsers - result > " + JSON.stringify(doc.data));
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
            if (err) {
                console.log("user.model: createUser - error > " + err);
                deferred.reject(err);
            } else {
                console.log("user.model: createUser - result > " + JSON.stringify(doc.data));
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, doc) {
            if (err) {
                console.log("user.model: deleteUserById - error > " + err);
                deferred.reject(err);
            } else {
                UserModel.find({}, function (err, doc) {
                    if (err) {
                        console.log("user.model: deleteUserById - error > " + err);
                        deferred.reject(err);
                    } else {
                        //console.log("user.model: deleteUserById - result > " + JSON.stringify(doc.data));
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel.findByIdAndUpdate(
            userId,
            {$set: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email,
                teams: user.teams,
                roles: user.roles,
                accessToken: user.accessToken,
                expiresIn: user.expiresIn,
                accountUserId: user.accountUserId,
                subscribers: user.subscribers,
                watching: user.watching
            }},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("user.model: updateUser - error > " + err);
                    deferred.reject(err);
                } else {
                    console.log("user.model: updateUser - result > " + JSON.stringify(doc.data));
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function updateFitbitConnDetails(userId, connDetails) {
        var deferred = q.defer();

        UserModel.findByIdAndUpdate(
            userId,
            {$set: {
                accessToken: connDetails.accessToken,
                expiresIn: connDetails.expiresIn,
                accountUserId: connDetails.accountUserId
            }},
            {new: true},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function addPersonalGoal(username, goalId) {
        var deferred = q.defer();
        console.log("user.model: addPersonalGoal - Adding goal > " + goalId);

        UserModel.update(
            {username: username},
            {$push: {goalIds: goalId}},
            {upsert: true},
            function (err, res) {
                if (err) {
                    console.log("user.model: addPersonalGoal - error > " + err);
                    deferred.reject(err);
                } else {
                    console.log("user.model: addPersonalGoal - result > " + JSON.stringify(doc.data));
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function retrievePersonalGoals(username) {
        var deferred = q.defer();

        UserModel.findOne({username: username}, 'goalIds', function (err, userGoals) {
            if (err) {
                console.log("user.model: retrievePersonalGoals - error > " + err);
                deferred.reject(err);
            } else {
                console.log("user.model: retrievePersonalGoals - result > " + JSON.stringify(userGoals.data));
                GoalModel.find({goalId: {$in: userGoals.data}}, function (err, goals) {
                    if (err) {
                        console.log("user.model: retrievePersonalGoals - error > " + err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(goals);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function removePersonalGoal(username, goalId) {
        var deferred = q.defer();

        UserModel.update(
            {username: username},
            {$pull: {goalIds: goalId}},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("user.model: removePersonalGoal - error > " + err);
                    deferred.reject(err);
                } else {
                    //console.log("user.model: removePersonalGoal - result > " + JSON.stringify(doc.data));
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function retrieveDataForAllUsers(userIds) {
        var deferred = q.defer();

        UserModel.find({userId: {$in: userIds}}, function (err, res) {
            if (err) {
                console.log("user.model: retrieveDataForAllUsers - error > " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    function addTeamAffiliation(username, teamId) {
        var deferred = q.defer();

        UserModel.update(
            {username: username},
            {$push: {teams: teamId}},
            {upsert: true},
            function (err, res) {
                if (err) {
                    console.log("user.model: addTeamAffiliation - error > " + err);
                    deferred.reject(err);
                } else {
                    //console.log("user.model: addTeamAffiliation - result > " + JSON.stringify(doc.data));
                    UserModel.findOne({username: username}, function (err, res) {
                        if (err) {
                            console.log("user.model: addTeamAffiliation - error > " + err);
                            deferred.reject(err);
                        } else {
                            deferred.resolve(res);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function deleteTeamAffiliation(userIds, teamId) {
        var deferred = q.defer();

        UserModel.update(
            {_id: {$in: userIds}},
            {$pull: {teams: teamId}},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("user.model: deleteTeamAffiliation - error > " + err);
                    deferred.reject(err);
                } else {
                    //console.log("user.model: deleteTeamAffiliation - result > " + JSON.stringify(doc.data));
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function addSubscriber(username, subscriberId) {
        var deferred = q.defer();

        UserModel.update(
            {username: username},
            {$push: {subscribers: subscriberId}},
            {upsert: true},
            function (err, res) {
                if (err) {
                    console.log("user.model: addSubscriber - error > " + err);
                    deferred.reject(err);
                } else {
                    //console.log("user.model: addSubscriber - result > " + JSON.stringify(doc.data));
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function deleteSubscriber(username, subscriberId) {
        var deferred = q.defer();

        UserModel.update(
            {username: username},
            {$pull: {subscribers: subscriberId}},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("user.model: deleteSubscriber - error > " + err);
                    deferred.reject(err);
                } else {
                    //console.log("user.model: deleteSubscriber - result > " + JSON.stringify(doc.data));
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function addToWatching(username, subscriberId) {
        var deferred = q.defer();

        UserModel.update(
            {username: username},
            {$push: {watching: subscriberId}},
            {upsert: true},
            function (err, res) {
                if (err) {
                    console.log("user.model: addToWatching - error > " + err);
                    deferred.reject(err);
                } else {
                    //console.log("user.model: addToWatching - result > " + JSON.stringify(doc.data));
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function deleteFromWatching(username, subscriberId) {
        var deferred = q.defer();

        UserModel.update(
            {username: username},
            {$pull: {watching: subscriberId}},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("user.model: deleteFromWatching - error > " + err);
                    deferred.reject(err);
                } else {
                    //console.log("user.model: deleteFromWatching - result > " + JSON.stringify(doc.data));
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }
};