/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

var mock = require("./user.mock.json");

module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(username, password) {
        for (var i=0; i<mock.length; i++) {
            var usr = mock[i];
            if (usr.username == username && usr.password == password) {
                return usr;
            }
        }
        return "Username: " + username + ", password: " + password;
    }

    function findAllUsers() {
        return mock;
    }

    function createUser(user) {
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
        return newUser;
    }

    function deleteUserById(userId) {
        for (var i=0; i<mock.length; i++) {
            if (mock[i]._id == userId) {
                mock = mock.splice(i, 1);
                return mock;
            }
        }
        return [];
    }

    function updateUser(userId, user) {
        for (var i=0; i<mock.length; i++) {
            if (mock[i]._id == userId) {
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].username = user.username;
                mock[i].password = user.password;
                mock[i].teams = user.teams;
                mock[i].roles = user.roles;
                return mock[i];
            }
        }
    }
};