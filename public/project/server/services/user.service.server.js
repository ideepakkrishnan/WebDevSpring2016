/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUserByCredentials);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user", getUsersByTeam);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function getUserByCredentials(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var user = userModel.findUserByCredentials(username, password);
        res.json(user);
    }

    function getUsersByTeam(req, res) {
        var teamId = req.query.teamId;
        var users = userModel.findUsersByTeam(teamId);
        res.json(users);
    }

    function getAllUsers(req, res) {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function createUser(req, res) {
        var userDetails = req.body;
        var newUser = userModel.createUser(userDetails);
        res.json(newUser);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var result = userModel.deleteUserById(userId);
        res.json(result);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updatedUser = userModel.updateUser(userId, user);
        res.json(updatedUser);
    }
};