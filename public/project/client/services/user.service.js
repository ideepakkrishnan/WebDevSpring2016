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
            goalInstances: [
                {"_id": 100, "username": "alice", "type": ["weight"], "calories": 0, "weight": 140, "fat": 0, "steps": 0, "distance": 0, "duration": 0, "floors": 0, "date": "01-Mar-2016"},
                {"_id": 120, "username": "alice", "type": ["sleep"], "calories": 0, "weight": 0, "fat": 0, "steps": 0, "distance": 0, "duration": 480, "floors": 0, "date": "02-Mar-2016"},
                {"_id": 140, "username": "alice", "type": ["activity"], "calories": 2500, "weight": 0, "fat": 0, "steps": 10000, "distance": 8.00, "duration": 1211, "floors": 10, "date": "03-Mar-2016"},
                {"_id": 160, "username": "alice", "type": ["fat"], "calories": 0, "weight": 0, "fat": 12, "steps": 0, "distance": 0, "duration": 0, "floors": 0, "date": "28-Feb-2016"},
                {"_id": 180, "username": "bob", "type": ["weight", "fat"], "calories": 0, "weight": 145, "fat": 14, "steps": 0, "distance": 0, "duration": 0, "floors": 0, "date": "29-Feb-2016"}
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
            updateUser: updateUser,
            findAllGoals: findAllGoals,
            createGoal: createGoal,
            deleteGoalById: deleteGoalById,
            updateGoal: updateGoal
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

        function cacheUserLocally(userInfo) {}

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

        function findAllGoals(callback) {
            callback(api.goalInstances);
        }

        function createGoal(goal, callback) {
            var newGoal = {
                "_id": (new Date).getTime(),
                "username": goal.username,
                "calories": goal.calories,
                "weight": goal.weight,
                "fat": goal.fat,
                "steps": goal.steps,
                "distance": goal.distance,
                "duration": goal.duration,
                "floors": goal.floors,
                "date": goal.date,
                "type": goal.type
            };

            api.goalInstances.push(newGoal);
            callback(api.goalInstances);
        }

        function deleteGoalById(goalId, callback) {
            var response = [];
            for (var i=0; i<api.goalInstances.length; i++) {
                if (api.goalInstances[i]._id != goalId) {
                    response.push(api.goalInstances[i]);
                }
            }
            api.goalInstances = response;
            callback(response);
        }

        function updateGoal(goalId, goal, callback) {
            for (var i=0; i<api.goalInstances.length; i++) {
                if (api.goalInstances[i]._id == goalId) {
                    api.goalInstances[i].username = goal.username;
                    api.goalInstances[i].calories = goal.calories;
                    api.goalInstances[i].weight = goal.weight;
                    api.goalInstances[i].fat = goal.fat;
                    api.goalInstances[i].steps = goal.steps;
                    api.goalInstances[i].distance = goal.distance;
                    api.goalInstances[i].duration = goal.duration;
                    api.goalInstances[i].floors = goal.floors;
                    api.goalInstances[i].date = goal.date;
                    api.goalInstances[i].type = goal.type;
                    callback(api.goalInstances);
                }
            }
        }
    }
})();