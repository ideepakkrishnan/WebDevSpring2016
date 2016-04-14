/**
 * Created by ideepakkrishnan on 18-03-2016.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    // Checks whether the session is authenticated
    var auth = function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next(); // Callback function given by express to continue in the chain
        }
    };

    // Available end points
    //app.post("/api/assignment/user", createUser);
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.post("/api/assignment/register", createUser);
    app.get("/api/assignment/user", getUserByCredentials);
    app.get("/api/assignment/user", auth, getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user", getUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.delete("/api/assignment/user/:id", auth, deleteUserById);
    app.get("/api/assignment/loggedIn", loggedIn);
    app.post("/api/assignment/logout", logout);

    passport.use(new LocalStrategy(localStrategy));

    // Helper functions that encipher and decipher cookies
    passport.serializeUser(serializeUser); // decides what goes to the client
    passport.deserializeUser(deserializeUser);

    function createUser(req, res) {
        var user = req.body;
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

    //passport helper functions: localStrategy, serializeUser, deserializeUser
    // Important Note: Configuration that glues passport with this application
    function localStrategy(username, password, done) {
        var credentials = {
            username: username,
            password: password
        };

        userModel.findUserByCredentials(credentials).then(
            function (doc) {
                console.log("Server found user: " + JSON.stringify(doc.data));
                if (!doc) {
                    return done(null, false);
                }
                return done(null, doc);
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
            .findUserById(user._id)
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
    }

    function getAllUsers(req, res) {
        var userList = userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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

        var user = userModel.findUserByCredentials(credentials).then(
            function (doc) {
                console.log("Server found user: " + JSON.stringify(doc.data));
                req.session.currentUser = doc.data;
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

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

};
