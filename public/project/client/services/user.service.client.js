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
            cacheUserLocally: cacheUserLocally
        };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password)
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
        }

        function findAllUsers() {
            return $http.get("/api/project/user")
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
        }

        function createUser(user) {
            return $http.post("/api/project/user", user)
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId)
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user)
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
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