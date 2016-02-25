/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
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
            for (var i=0; i<api.userList.length; i++) {
                var usr = api.userList[i];
                if (usr.username == username && usr.password == password) {
                    callback(usr);
                }
            }
            callback(null);
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
                var currUser = api.userList[i];
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