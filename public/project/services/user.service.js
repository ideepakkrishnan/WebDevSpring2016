/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .factory("UserService", userService);

    function userService() {

        var api = {
            userList: [
                {"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice", "password":"alice", "email":"alice@fb.com", "teams": [1], "roles": ["player"]},
                {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "email":"bob@fb.com", "teams": [1], "roles": ["watcher"]},
                {"_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie", "password":"charlie", "email": "charlie@fb.com", "teams": [1], "roles": ["player"]},
                {"_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "email": "dan@fb.com", "teams": [1], "roles": ["watcher", "admin"]},
                {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed", "email": "edward@fb.com", "teams": [], "roles": ["developer"]}
            ],
            teamList: {
                1: {"name": "Husky Soccer", "description": "The official account for Northeastern Soccer team", "image": "http://www.northeastern.edu/breastfeedingcme/_img/NU%20LOGO.jpg"}
            },
            findUserByCredentials: findUserByCredentials,
            findUsersByTeam: findUsersByTeam,
            fetchTeamDetails: fetchTeamDetails,
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

        function findUsersByTeam(teamId, callback) {
            var response = [];
            for (var i=0; i<api.userList.length; i++) {
                if (api.userList[i].teams.indexOf(teamId) >= 0) {
                    response.push(api.userList[i]);
                }
            }
            callback(response);
        }

        function fetchTeamDetails(teamIdList, callback) {
            var response = [];
            for (var i=0; i<teamIdList.length; i++) {
                var teamDetails = api.teamList[teamIdList[i]];
                teamDetails["teamId"] = teamIdList[i];
                response.push(teamDetails);
            }
            callback(response);
        }

        function findAllUsers(callback) {
            callback(api.userList);
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

            api.userList.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for (var i=0; i<api.userList.length; i++) {
                if (api.userList[i]._id == userId) {
                    api.userList = api.userList.splice(i, 1);
                    callback(api.userList);
                }
            }
            callback(null);
        }

        function updateUser(userId, user, callback) {
            for (var i=0; i<api.userList.length; i++) {
                if (api.userList[i]._id == userId) {
                    api.userList[i].firstName = user.firstName;
                    api.userList[i].lastName = user.lastName;
                    api.userList[i].username = user.username;
                    api.userList[i].password = user.password;
                    api.userList[i].teams = user.teams;
                    api.userList[i].roles = user.roles;
                    callback(api.userList[i]);
                }
            }
        }
    }
})();