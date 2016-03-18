var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        var usr = null;
        for (var i=0; i<mock.length; i++) {
            if (mock[i].username == credentials.username && mock[i].password == credentials.password) {
                usr = mock[i];
                break;
            }
        }
        return usr;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if(mock[u]._id === userId) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if(mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllUsers() {
        return mock;
    }

    function createUser(user) {
        var last_id = mock[mock.length - 1]._id;
        var newUser = {
            "_id": (last_id + 100),
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "roles": user.roles
        };

        mock.push(newUser);
        return newUser;
    }

    function filterUsers(user, userId) {
        return user._id != userId;
    }

    function deleteUserById(userId) {
        mock = mock.filter(filterUsers, userId);
        return mock;
    }

    function updateUser(userId, user) {
        for (var i=0; i<mock.length; i++) {
            if (mock[i]._id == userId) {
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].username = user.username;
                mock[i].password = user.password;
                mock[i].roles = user.roles;
                return mock[i];
            }
        }
    }
};