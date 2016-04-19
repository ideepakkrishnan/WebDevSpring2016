/**
 * Created by ideepakkrishnan on 18-03-2016.
 */

//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel) {

    // Checks whether the session is authenticated
    var auth = function (req, res, next) {
        console.log("user.service.server - checking if authorized");
        if (!req.isAuthenticated()) {
            console.log("user.service.server - Unauthorized");
            res.send(401);
        } else {
            console.log("user.service.server - Authorize. Passing down the chain.");
            next(); // Callback function given by express to continue in the chain
        }
    };

    // Available end points
    //app.post("/api/assignment/login", passport.authenticate('local'), login);
    //app.post("/api/assignment/register", createUser);
    app.get("/api/assignment/user", getUserByCredentials);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user", getUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    //app.get("/api/assignment/loggedIn", loggedIn);
    //app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/admin/user", auth, createNewUser);
    app.get("/api/assignment/admin/user", auth, getAllUsers);
    app.get("/api/assignment/admin/user/:id", auth, getExistingUserById);
    app.delete("/api/assignment/admin/user/:id", auth, deleteUserById);
    app.put("/api/assignment/admin/user/:id", auth, updateExistingUserById);

    //passport.use(new LocalStrategy(localStrategy));

    // Helper functions that encipher and decipher cookies
    /*passport.serializeUser(serializeUser); // decides what goes to the client
    passport.deserializeUser(deserializeUser);*/

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password); // Excrypt the password before storing it
        user.roles = ["student"];

        userModel
            .findUserByUsername(user.username) // To check if a user by the same username exists
            .then(
                function (doc) {
                    if (doc) {
                        res.json(null);
                    } else {
                        return userModel.createUser(user); // Since the user doesn't exist, create one
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    if (doc) {
                        // use the passport helper function to login the newly created user
                        req.login(doc, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(doc);
                            }
                        });
                    }
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // passport helper functions: localStrategy, serializeUser, deserializeUser
    // Important Note: Configuration that glues passport with this application
    /*function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("Comparing: " + password + " and " + user.password);
                    if (user && bcrypt.compareSync(password, user.password)) {
                        console.log("Authenticated");
                        return done(null, user);
                    } else {
                        console.log("Restricted");
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserByUsername(user.username)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }*/

    function getAllUsers(req, res) {
        if (isAdmin(req.user)) {
            console.log("user.service.server.getAllUsers - Fetching list of all users");
            userModel
                .findAllUsers()
                .then(
                    function (doc) {
                        console.log("user.service.server.getAllUsers - result: " + JSON.stringify(doc));
                        res.json(doc);
                    },
                    function (err) {
                        console.log("user.service.server.getAllUsers - error: " + err.message);
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function getUserById(req, res) {
        var userId = req.params.id;

        // use model to find user by id
        var user = userModel.findUserById(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;

        // use model to find user by username
        var user = userModel.findUserByUsername(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("Server found user: " + JSON.stringify(user));
                    if (user && bcrypt.compareSync(password, user.password)) {
                        req.session.currentUser = user;
                        res.json(user);
                    } else {
                        res.status(400).send(err);
                    }
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;

        console.log("user.service.server - updateUserById - updated details: " + JSON.stringify(user));

        if (user.password) {
            console.log("user.service.server - updateUserById - Encrypting password");
            user.password = bcrypt.hashSync(user.password);
        }

        userModel.updateUser(userId, user)
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
        if (isAdmin(req.user)) {
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
        } else {
            res.status(403);
        }
    }

    /*function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }*/

    function isAdmin(user) {
        console.log("user.model - isAdmin - argument passed: " + JSON.stringify(user));
        return (user.roles.indexOf("admin") != -1);
    }

    function createNewUser(req, res) {
        if (isAdmin(req.user)) {
            var user = req.body;

            userModel
                .findUserByUsername(user.username) // To check if a user by the same username exists
                .then(
                    function (doc) {
                        if (doc) {
                            res.json(null);
                        } else {
                            user.password = bcrypt.hashSync(user.password);
                            return userModel.createUser(user); // Since the user doesn't exist, create one
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
        } else {
            res.status(403);
        }
    }

    function getExistingUserById(req, res) {
        if (isAdmin(req.user)) {
            var userId = req.params.id;

            userModel.findUserById(userId).then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        } else {
            res.status(403);
        }
    }

    function updateExistingUserById(req, res) {
        if (isAdmin(req.user)) {
            var userId = req.params.id;
            var user = req.body;

            if (user.password && user.password.length > 0) {
                user.password = bcrypt.hashSync(user.password);
            }

            userModel.updateUser(userId, user)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }
};
