/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService() {

        var userList = [
            {
                "_id":123,
                "firstName":"Alice",
                "lastName":"Wonderland",
                "username":"alice",
                "password":"alice",
                "roles": ["student"]
            },
            {
                "_id":234,
                "firstName":"Bob",
                "lastName":"Hope",
                "username":"bob",
                "password":"bob",
                "roles": ["admin"]
            },
            {
                "_id":345,
                "firstName":"Charlie",
                "lastName":"Brown",
                "username":"charlie",
                "password":"charlie",
                "roles": ["faculty"]
            },
            {
                "_id":456,
                "firstName":"Dan",
                "lastName":"Craig",
                "username":"dan",
                "password":"dan",
                "roles": ["faculty", "admin"]
            },
            {
                "_id":567,
                "firstName":"Edward",
                "lastName":"Norton",
                "username":"ed",
                "password":"ed",
                "roles": ["student"]
            }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            for (var i=0; i<userList.length; i++) {
                var usr = userList[i];
                if (usr.username == username && usr.password == password) {
                    callback(usr);
                }
            }
            callback(null);
        }

        function findAllUsers(callback) {
            callback(userList);
        }

        function createUser(user, callback) {
            var last_id = userList[userList.length - 1]._id;
            var newUser = {
                "_id": (last_id + 100),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "roles": user.roles
            };

            userList.push(newUser);
            callback(newUser);
        }

        function filterUsers(user, userId) {
            return user._id != userId;
        }

        function deleteUserById(userId, callback) {
            userList = userList.filter(filterUsers, userId);
            callback(userList);
        }

        function updateUser(userId, user, callback) {
            for (var i=0; i<userList.length; i++) {
                var currUser = userList[i];
                if (currUser._id == userId) {
                    currUser.firstName = user.firstName;
                    currUser.lastName = user.lastName;
                    currUser.username = user.username;
                    currUser.password = user.password;
                    currUser.roles = user.roles;
                    callback(currUser);
                }
            }
        }
    }
})();