/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

var mock = require("./user.mock.json");

module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUsersByTeam: findUsersByTeam,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(username, password, callback) {
        for (var i=0; i<mock.length; i++) {
            var usr = mock[i];
            if (usr.username == username && usr.password == password) {
                callback(usr);
            }
        }
        callback(null);
    }

    function findUsersByTeam(teamId, callback) {
        var response = [];
        for (var i=0; i<mock.length; i++) {
            if (mock[i].teams.indexOf(teamId) >= 0) {
                response.push(mock[i]);
            }
        }
        callback(response);
    }

    function findAllUsers(callback) {
        callback(mock);
    }

    function createUser(user, callback) {
        var newUser = {
            "_id": (new Date).getTime(),
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "teams": user.teams,
            "roles": user.roles
        };

        mock.push(newUser);
        callback(newUser);
    }

    function deleteUserById(userId, callback) {
        for (var i=0; i<mock.length; i++) {
            if (mock[i]._id == userId) {
                mock = mock.splice(i, 1);
                callback(mock);
            }
        }
        callback(null);
    }

    function updateUser(userId, user, callback) {
        for (var i=0; i<mock.length; i++) {
            if (mock[i]._id == userId) {
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].username = user.username;
                mock[i].password = user.password;
                mock[i].teams = user.teams;
                mock[i].roles = user.roles;
                callback(mock[i]);
            }
        }
    }
};