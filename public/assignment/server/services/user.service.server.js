/**
 * Created by ideepakkrishnan on 18-03-2016.
 */

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        var userList = [];

        // use model to find user by id
        userModel.createUser(user)
            .then(
                // first retrieve the created user for logging purposes
                function (doc) {
                    console.log(doc);
                    // Now return all the users as a json response
                    userList = userModel.findAllUsers();
                    res.json(userList);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserById(req, res) {
        var userId = req.params.id;

        // use model to find user by id
        userModel.findUserById(userId)
            .then(
                // first retrieve the user by user id
                function (doc) {
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getUserByUsername(req, res) {
        var username = req.params.username;

        // use model to find user by username
        userModel.findUserById(username)
            .then(
                // retrieve the user by username and return the details
                function (doc) {
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getUserByCredentials(req, res) {
        var credentials = {
            username: req.params.username,
            password: req.params.password
        };

        userModel.findUserByCredentials(credentials)
            .then(
                // retrieve the user by username and return the details
                function (doc) {
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then(
                function (doc) {
                    req.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

}
