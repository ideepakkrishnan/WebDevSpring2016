/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            login: login,
            createNewUser: createNewUser,
            updateExistingUserById: updateExistingUserById
        };
        return api;

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/register", user);
        }

        function createNewUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateExistingUserById(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            //return $rootScope.currentUser;
            return $http.get("/api/assignment/loggedIn");
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }
    }
})();