/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService() {

        var api = {
            userList: [
                {"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice", "password":"alice", "email":"alice@fb.com", "roles": ["student"]},
                {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "email":"bob@fb.com", "roles": ["admin"]},
                {"_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie", "password":"charlie", "email": "charlie@fb.com", "roles": ["faculty"]},
                {"_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "email": "dan@fb.com", "roles": ["faculty", "admin"]},
                {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed", "email": "edward@fb.com", "roles": ["student"]}
            ],
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            var usr = null;
            for (var i=0; i<api.userList.length; i++) {
                usr = api.userList[i];
                if (usr.username == username && usr.password == password) {
                    break;
                }
            }
            callback(usr);
        }

        function findAllUsers(callback) {
            callback(api.userList);
        }

        function createUser(user, callback) {
            var last_id = api.userList[api.userList.length - 1]._id;
            var newUser = {
                "_id": (last_id + 100),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "roles": user.roles
            };

            api.userList.push(newUser);
            callback(newUser);
        }

        function filterUsers(user, userId) {
            return user._id != userId;
        }

        function deleteUserById(userId, callback) {
            api.userList = api.userList.filter(filterUsers, userId);
            callback(api.userList);
        }

        function updateUser(userId, user, callback) {
            for (var i=0; i<api.userList.length; i++) {
                if (api.userList[i]._id == userId) {
                    api.userList[i].firstName = user.firstName;
                    api.userList[i].lastName = user.lastName;
                    api.userList[i].username = user.username;
                    api.userList[i].password = user.password;
                    api.userList[i].roles = user.roles;
                    callback(api.userList[i]);
                }
            }
        }
    }
})();