/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.get("/api/project/user", getUserByCredentials);
    app.get("/api/project/user", getAllUsers);
    app.put("/api/project/user/:id", updateUserById);
    app.get("/api/project/user/search/:firstName", searchUsingFirstName);
    app.put("/api/project/user/:id/device", updateFitbitConnDetails);
    app.put("/api/project/user/:username/goals", addPersonalGoal);
    app.get("/api/project/user/:username/goals", retrievePersonalGoals);
    app.delete("/api/project/user/:username/goals", removePersonalGoal);
    app.get("/api/project/user/filter/userIds", retrieveDataForSelectedUserIds);
    app.get("/api/project/user/filter/usernames", retrieveDataForSelectedUsernames);
    app.put("/api/project/user/:username/teams", addTeamAffiliation);
    app.delete("/api/project/user/teams/:teamId", deleteTeamAffiliation);
    app.put("/api/project/user/:username/subscribers", addSubscriber);
    app.delete("/api/project/user/:username/subscribers", deleteSubscriber);
    app.put("/api/project/user/:username/watching", addToWatching);
    app.delete("/api/project/user/:username/subscribers", deleteFromWatching);

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = userModel.findUserByCredentials(username, password)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res) {
        var users = userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var userDetails = req.body;
        userDetails.roles = ["player", "watcher"]; // Security measure to prevent client side hacks

        userModel
            .findUserByUsername(userDetails.username) // Check if a user by the same username exists
            .then(
                function (doc) {
                    if (doc) {
                        res.json(null);
                    } else {
                        return userModel.createUser(userDetails);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var result = userModel.deleteUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updatedUser = userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function searchUsingFirstName(req, res) {
        var firstName = req.params.firstName;
        var searchResults = userModel.searchUsingFirstName(firstName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFitbitConnDetails(req, res) {
        var userId = req.params.id;
        var connDetails = req.body;
        var updatedUser = userModel.updateFitbitConnDetails(userId, connDetails)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addPersonalGoal(req, res) {
        var username = req.params.username;
        var goalId = req.body;
        var updatedUser = userModel.addPersonalGoal(username, goalId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function retrievePersonalGoals(req, res) {
        var username = req.params.username;
        var updatedUser = userModel.retrievePersonalGoals(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removePersonalGoal(req, res) {
        var username = req.params.username;
        var goalId = req.body;
        var updatedUser = userModel.removePersonalGoal(username, goalId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function retrieveDataForSelectedUserIds(req, res) {
        var userIds = req.body;
        var updatedUser = userModel.retrieveDataForSelectedUserIds(userIds)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function retrieveDataForSelectedUsernames(req, res) {
        var usernames = req.body;
        var updatedUser = userModel.retrieveDataForSelectedUsernames(usernames)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addTeamAffiliation(req, res) {
        var username = req.params.username;
        var teamId = req.body.teamId;
        var updatedUser = userModel.addTeamAffiliation(username, teamId)
            .then(
                function (doc) {
                    console.log(doc.data);
                    res.json(doc);
                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function deleteTeamAffiliation(req, res) {
        var teamId = req.params.teamId;
        var userIds = req.body;
        var updatedUser = userModel.deleteTeamAffiliation(teamId, userIds)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addSubscriber(req, res) {
        var username = req.params.username;
        var subscriberId = req.body;
        var updatedUser = userModel.addSubscriber(username, subscriberId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteSubscriber(req, res) {
        var username = req.params.username;
        var subscriberId = req.body;
        var updatedUser = userModel.deleteSubscriber(username, subscriberId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addToWatching(req, res) {
        var username = req.params.username;
        var subscriberId = req.body;
        var updatedUser = userModel.addToWatching(username, subscriberId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFromWatching(req, res) {
        var username = req.params.username;
        var subscriberId = req.body;
        var updatedUser = userModel.deleteFromWatching(username, subscriberId)
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