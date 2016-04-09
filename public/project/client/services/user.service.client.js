/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    "use strict";

    angular
        .module("PerformXApp")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            cacheUserLocally: cacheUserLocally,
            updateDeviceConnection: updateDeviceConnection
        };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function updateDeviceConnection(userId, connDetails) {
            return $http.put("/api/project/user/" + userId + "/device", connDetails);
        }

        function cacheUserLocally(user) {
            var userInfo = {
                currentUser: user
            };
            // Caches the user info for this browser session
            window.sessionStorage.setItem("pxUserCache", JSON.stringify(userInfo));
        }
    }
})();