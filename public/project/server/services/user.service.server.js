/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", getUserByCredentials);
    app.get("/api/project/user/:username", getUserByUsername);
    app.put("/api/project/user/:id", updateUserById);
    app.get("/api/project/user/search/:name", searchForName);
    app.put("/api/project/user/:id/device", updateFitbitConnDetails);
    app.put("/api/project/user/:username/goals", addPersonalGoal);
    app.get("/api/project/user/:username/goals", retrievePersonalGoals);
    app.delete("/api/project/user/:username/goals", removePersonalGoal);
    app.get("/api/project/user/filter/userIds/:uids", retrieveDataForSelectedUserIds);
    app.get("/api/project/user/filter/usernames/:unames", retrieveDataForSelectedUsernames);
    app.put("/api/project/user/:username/teams", addTeamAffiliation);
    app.delete("/api/project/user/teams/:teamId", deleteTeamAffiliation);
    app.put("/api/project/user/:username/subscribers", addSubscriber);
    app.delete("/api/project/user/:username/subscribers", deleteSubscriber);
    app.put("/api/project/user/:username/watching", addToWatching);
    app.delete("/api/project/user/:username/subscribers", deleteFromWatching);
    // Admin specific
    app.post("/api/project/admin/user", createNewUser);
    app.put("/api/project/admin/user/:id", updateExistingUserById);
    app.delete("/api/project/admin/user/:id", deleteUserById);
    app.get("/api/project/admin/user", getAllUsers);

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    console.log("Server found user: " + JSON.stringify(user));
                    if (user && bcrypt.compareSync(password, user.password)) {
                        //req.session.currentUser = user;
                        console.log("Authorized");
                        res.json(user);
                    } else {
                        console.log("Unauthorized");
                        res.status(400).send(err);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req, res) {
        var username = req.params.username;
        
        userModel
            .findUserByUsername(username)
            .then(
                function (doc) {
                    delete doc.password;
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
                        userDetails.password = bcrypt.hashSync(userDetails.password);
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

    function createNewUser(req, res) { // Admin function
        var userDetails = req.body;

        userModel
            .findUserByUsername(userDetails.username) // Check if a user by the same username exists
            .then(
                function (doc) {
                    if (doc) {
                        res.json(null);
                    } else {
                        userDetails.password = bcrypt.hashSync(userDetails.password);
                        return userModel.createUser(userDetails);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (doc) {
                    return userModel.findAllUsers();
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

    function deleteUserById(req, res) { // Admin function
        var userId = req.params.id;
        userModel
            .deleteUserById(userId)
            .then(
                function (doc) {
                    return userModel.findAllUsers();
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

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;

        if (user.password && user.password.length > 0) {
            user.password = bcrypt.hashSync(user.password);
        }

        userModel
            .updateUser(userId, user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateExistingUserById(req, res) { // Admin function
        var userId = req.params.id;
        var user = req.body;

        if (user.password && user.password.length > 0) {
            user.password = bcrypt.hashSync(user.password);
        }

        userModel
            .updateUser(userId, user)
            .then(
                function (doc) {
                    return userModel.findAllUsers();
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

    function searchForName(req, res) {
        var name = req.params.name;
        userModel.searchForName(name)
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
        var userIds = req.params.uids.split(',');
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
        var usernames = req.params.unames.split(',');
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
        userModel.addTeamAffiliation(username, teamId)
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