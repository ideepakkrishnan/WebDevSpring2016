/**
 * Created by ideepakkrishnan on 03-03-2016.
 */

(function () {
    angular
        .module("DataModelApp")
        .factory("HealthDataService", healthDataService);

    function healthDataService() {

        var api = {
            userList: [
                {"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice", "password":"alice",
                    "email":"alice@fb.com", "teams": [1], "roles": ["player"], "dob": "12-Jan-1992", "city": "Boston",
                    "country": "USA"},
                {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "email":"bob@fb.com",
                    "teams": [1], "roles": ["watcher"], "dob": "19-Dec-1988", "city": "Seattle", "country": "USA"},
                {"_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie", "password":"charlie",
                    "email": "charlie@fb.com", "teams": [1], "roles": ["player"], "dob": "05-May-1989", "city": "San Fransisco",
                    "country": "USA"},
                {"_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "email": "dan@fb.com",
                    "teams": [1], "roles": ["watcher", "admin"], "dob": "25-Feb-1991", "city": "New York", "country": "USA"},
                {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed",
                    "email": "edward@fb.com", "teams": [], "roles": ["developer"], "dob": "17-Jul-1989", "city": "Chicago",
                    "country": "USA"}
            ],
            teamList: {
                1: {"name": "Husky Soccer", "description": "The official account for Northeastern Soccer team", "image": "http://www.northeastern.edu/breastfeedingcme/_img/NU%20LOGO.jpg"}
            },
            fetchTeamDetails: fetchTeamDetails,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

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
                "roles": user.roles,
                "dob": user.dob,
                "city": user.city,
                "country": user.country
            };

            api.userList.push(newUser);
            callback(api.userList);
        }

        function deleteUserById(userId, callback) {
            var response = [];
            for (var i=0; i<api.userList.length; i++) {
                if (api.userList[i]._id != userId) {
                    response.push(api.userList[i]);
                }
            }
            api.userList = response;
            callback(response);
        }

        function updateUser(userId, user, callback) {
            for (var i=0; i<api.userList.length; i++) {
                if (api.userList[i]._id == userId) {
                    api.userList[i].firstName = user.firstName;
                    api.userList[i].lastName = user.lastName;
                    api.userList[i].username = user.username;
                    api.userList[i].password = user.password;
                    api.userList[i].email = user.email;
                    api.userList[i].teams = user.teams;
                    api.userList[i].roles = user.roles;
                    api.userList[i].dob = user.dob;
                    api.userList[i].city = user.city;
                    api.userList[i].country = user.country;
                    callback(api.userList);
                }
            }
        }
    }
})();