/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    "use strict";

    angular
        .module("PerformXApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            getUserByUsername: getUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            createNewUser: createNewUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateExistingUserById: updateExistingUserById,
            searchForName: searchForName,
            cacheUserLocally: cacheUserLocally,
            updateDeviceConnection: updateDeviceConnection,
            addPersonalGoal: addPersonalGoal,
            getPersonalGoals: getPersonalGoals,
            deletePersonalGoal: removePersonalGoal,
            getDataForSelectedUsers: getDataForSelectedUsers,
            getDataForSelectedUsernames: getDataForSelectedUsernames,
            addTeamAffiliation: addTeamAffiliation,
            deleteTeamAffiliation: deleteTeamAffiliation,
            addSubscriber: addSubscriber,
            deleteSubscriber: deleteSubscriber,
            addToWatching: addToWatching,
            deleteFromWatching: deleteFromWatching,
            getCurrentUser: getCurrentUser,
            login: login,
            logout: logout,
            setCurrentUser: setCurrentUser
        };
        return api;

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedIn");
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function getUserByUsername(username) {
            return $http.get("/api/project/user/" + username);
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function createNewUser(user) {
            return $http.post("/api/project/admin/user", user);
        }

        function updateExistingUserById(userId, user) {
            return $http.put("/api/project/admin/user/" + userId, user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/admin/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function searchForName(name) {
            return $http.get("/api/project/user/search/" + name);
        }

        function updateDeviceConnection(userId, connDetails) {
            return $http.put("/api/project/user/" + userId + "/device", connDetails);
        }

        function addPersonalGoal(username, goal) {
            return $http.put("/api/project/user/" + username + "/goals", goal);
        }

        function getPersonalGoals(username) {
            return $http.get("/api/project/user/" + username + "/goals");
        }

        function removePersonalGoal(username, goalId) {
            return $http.delete("/api/project/user/" + username + "/goals", goalId);
        }

        function getDataForSelectedUsers(userIds) {
            return $http.get("/api/project/user/filter/userIds/" + userIds.splice(','));
        }

        function getDataForSelectedUsernames(usernames) {
            return $http.get("/api/project/user/filter/usernames/" + usernames.splice(','));
        }

        function addTeamAffiliation(username, teamDetails) {
            return $http.put("/api/project/user/" + username + "/teams", teamDetails);
        }

        function deleteTeamAffiliation(teamId, userIds) {
            return $http.delete("/api/project/user/teams/" + teamId, userIds);
        }

        function addSubscriber(username, subscriberId) {
            return $http.put("/api/project/user/" + username + "/subscribers", subscriberId);
        }

        function deleteSubscriber(username, subscriberId) {
            return $http.delete("/api/project/user/" + username + "/subscribers", subscriberId);
        }

        function addToWatching(username, userId) {
            return $http.put("/api/project/user/" + username + "/watching", userId);
        }

        function deleteFromWatching(username, subscriberId) {
            return $http.delete("/api/project/user/" + username + "/subscribers", subscriberId);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
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