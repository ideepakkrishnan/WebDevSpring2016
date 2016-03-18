/**
 * Created by ideepakkrishnan on 18-03-2016.
 */

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUserByCredentials);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user", getUserByUsername);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;

        // use model to find user by id
        var userList = userModel.createUser(user);
        res.json(userList);
    }

    function getAllUsers(req, res) {
        var userList = userModel.findAllUsers();
        res.json(userList);
    }

    function getUserById(req, res) {
        var userId = req.params.id;

        // use model to find user by id
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function getUserByUsername(req, res) {
        var username = req.params.username;

        // use model to find user by username
        var user = userModel.findUserById(username);
        res.json(user);
    }

    function getUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };

        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updatedUser = userModel.updateUser(userId, user);
        res.json(updatedUser);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var result = userModel.deleteUserById(userId);
        res.json(result);
    }

}
