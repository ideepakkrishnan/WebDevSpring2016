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
            sleepInstances: [
                {"_id": 100, "username": "alice", "duration": 480, restlessDuration: 13, "timeInBed": 600, "date": "01-Mar-2016"},
                {"_id": 120, "username": "alice", "duration": 230, restlessDuration: 27, "timeInBed": 335, "date": "02-Mar-2016"},
                {"_id": 140, "username": "alice", "duration": 540, restlessDuration: 11, "timeInBed": 612, "date": "03-Mar-2016"},
                {"_id": 160, "username": "alice", "duration": 556, restlessDuration: 0, "timeInBed": 559, "date": "28-Feb-2016"},
                {"_id": 180, "username": "alice", "duration": 495, restlessDuration: 10, "timeInBed": 610, "date": "28-Feb-2016"}
            ],
            heartRateInstances: [
                {"_id": 100, "username": "alice", "rate": 68, "date": "01-Mar-2016"},
                {"_id": 120, "username": "alice", "rate": 72, "date": "02-Mar-2016"},
                {"_id": 140, "username": "alice", "rate": 60, "date": "03-Mar-2016"},
                {"_id": 160, "username": "alice", "rate": 65, "date": "28-Feb-2016"},
                {"_id": 180, "username": "alice", "rate": 62, "date": "29-Feb-2016"}
            ],
            weightInstances: [
                {"_id": 100, "username": "alice", "bmi": 23.57, "fat": 14.5, "date": "01-Mar-2016"},
                {"_id": 120, "username": "alice", "bmi": 23.10, "fat": 14.2, "date": "02-Mar-2016"},
                {"_id": 140, "username": "alice", "bmi": 22.98, "fat": 14.1, "date": "03-Mar-2016"},
                {"_id": 160, "username": "alice", "bmi": 23.60, "fat": 14.6, "date": "28-Feb-2016"},
                {"_id": 180, "username": "alice", "bmi": 23.12, "fat": 14.2, "date": "29-Feb-2016"}
            ],
            fatInstances: [
                {"_id": 100, "username": "alice", "fat": 14.5, "date": "01-Mar-2016"},
                {"_id": 120, "username": "alice", "fat": 14.2, "date": "02-Mar-2016"},
                {"_id": 130, "username": "alice", "fat": 14.1, "date": "03-Mar-2016"},
                {"_id": 140, "username": "alice", "fat": 14.6, "date": "28-Feb-2016"},
                {"_id": 150, "username": "alice", "fat": 14.2, "date": "29-Feb-2016"}
            ],
            activityInstances: [
                {"_id": 100, "username": "alice", "calories": 230, "steps": 3783, "distance": 2.04, "duration": 1166},
                {"_id": 120, "username": "alice", "calories": 210, "steps": 3541, "distance": 1.97, "duration": 945},
                {"_id": 140, "username": "alice", "calories": 245, "steps": 4121, "distance": 2.54, "duration": 1211},
                {"_id": 160, "username": "alice", "calories": 275, "steps": 4573, "distance": 3.56, "duration": 1456},
                {"_id": 180, "username": "alice", "calories": 202, "steps": 3231, "distance": 1.54, "duration": 856}
            ],
            teamList: {
                1: {"name": "Husky Soccer", "description": "The official account for Northeastern Soccer team",
                    "image": "http://www.northeastern.edu/breastfeedingcme/_img/NU%20LOGO.jpg"}
            },
            fetchTeamDetails: fetchTeamDetails,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findAllSleepInstances: findAllSleepInstances,
            createSleepInstance: createSleepInstance,
            deleteSleepInstanceById: deleteSleepInstanceById,
            updateSleepInstance: updateSleepInstance,
            findAllHeartRateInstances: findAllHeartRateInstances,
            createHeartRateInstance: createHeartRateInstance,
            deleteHeartRateInstanceById: deleteHeartRateInstanceById,
            updateHeartRateInstance: updateHeartRateInstance,
            findAllWeightInstances: findAllWeightInstances,
            createWeightInstance: createWeightInstance,
            deleteWeightInstanceById: deleteWeightInstanceById,
            updateWeightInstance: updateWeightInstance,
            findAllFatInstances: findAllFatInstances,
            createFatInstance: createFatInstance,
            deleteFatInstanceById: deleteFatInstanceById,
            updateFatInstance: updateFatInstance,
            findAllActivityInstances: findAllActivityInstances,
            createActivityInstance: createActivityInstance,
            deleteActivityInstanceById: deleteActivityInstanceById,
            updateActivityInstance: updateActivityInstance
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

        /*
        * Methods for User data
        */

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

        /*
        * Methods for sleep data
        */

        function findAllSleepInstances(callback) {
            callback(api.sleepInstances);
        }

        function createSleepInstance(obj, callback) {
            var newObj = {
                "_id": (new Date).getTime(),
                "username": obj.username,
                "duration": obj.duration,
                "restlessDuration": obj.restlessDuration,
                "timeInBed": obj.timeInBed,
                "date": obj.date
            };

            api.sleepInstances.push(newObj);
            callback(api.sleepInstances);
        }

        function deleteSleepInstanceById(objId, callback) {
            var response = [];
            for (var i=0; i<api.sleepInstances.length; i++) {
                if (api.sleepInstances[i]._id != objId) {
                    response.push(api.sleepInstances[i]);
                }
            }
            api.sleepInstances = response;
            callback(response);
        }

        function updateSleepInstance(objId, obj, callback) {
            for (var i=0; i<api.sleepInstances.length; i++) {
                if (api.sleepInstances[i]._id == objId) {
                    api.sleepInstances[i].username = obj.username;
                    api.sleepInstances[i].duration = obj.duration;
                    api.sleepInstances[i].restlessDuration = obj.restlessDuration;
                    api.sleepInstances[i].timeInBed = obj.timeInBed;
                    api.sleepInstances[i].date = obj.date;
                    break;
                }
            }
            callback(api.sleepInstances);
        }

        /*
        * Methods for heart rate data
        */

        function findAllHeartRateInstances(callback) {
            callback(api.heartRateInstances);
        }

        function createHeartRateInstance(obj, callback) {
            var newObj = {
                "_id": (new Date).getTime(),
                "username": obj.username,
                "rate": obj.rate,
                "date": obj.date
            };

            api.heartRateInstances.push(newObj);
            callback(api.heartRateInstances);
        }

        function deleteHeartRateInstanceById(objId, callback) {
            var response = [];
            for (var i=0; i<api.heartRateInstances.length; i++) {
                if (api.heartRateInstances[i]._id != objId) {
                    response.push(api.heartRateInstances[i]);
                }
            }
            api.heartRateInstances = response;
            callback(response);
        }

        function updateHeartRateInstance(objId, obj, callback) {
            for (var i=0; i<api.heartRateInstances.length; i++) {
                if (api.heartRateInstances[i]._id == objId) {
                    api.heartRateInstances[i].username = obj.username;
                    api.heartRateInstances[i].rate = obj.rate;
                    api.heartRateInstances[i].date = obj.date;
                    break;
                }
            }
            callback(api.heartRateInstances);
        }

        /*
         * Methods for weight rate data
         */

        function findAllWeightInstances(callback) {
            callback(api.weightInstances);
        }

        function createWeightInstance(obj, callback) {
            var newObj = {
                "_id": (new Date).getTime(),
                "username": obj.username,
                "bmi": obj.bmi,
                "fat": obj.fat,
                "date": obj.date
            };

            api.weightInstances.push(newObj);
            callback(api.weightInstances);
        }

        function deleteWeightInstanceById(objId, callback) {
            var response = [];
            for (var i=0; i<api.weightInstances.length; i++) {
                if (api.weightInstances[i]._id != objId) {
                    response.push(api.weightInstances[i]);
                }
            }
            api.weightInstances = response;
            callback(response);
        }

        function updateWeightInstance(objId, obj, callback) {
            for (var i=0; i<api.weightInstances.length; i++) {
                if (api.weightInstances[i]._id == objId) {
                    api.weightInstances[i].username = obj.username;
                    api.weightInstances[i].bmi = obj.bmi;
                    api.weightInstances[i].fat = obj.fat;
                    api.weightInstances[i].date = obj.date;
                    break;
                }
            }
            callback(api.weightInstances);
        }

        /*
         * Methods for Fat data
         */

        function findAllFatInstances(callback) {
            callback(api.fatInstances);
        }

        function createFatInstance(obj, callback) {
            var newObj = {
                "_id": (new Date).getTime(),
                "username": obj.username,
                "fat": obj.fat,
                "date": obj.date
            };

            api.fatInstances.push(newObj);
            callback(api.fatInstances);
        }

        function deleteFatInstanceById(objId, callback) {
            var response = [];
            for (var i=0; i<api.fatInstances.length; i++) {
                if (api.fatInstances[i]._id != objId) {
                    response.push(api.fatInstances[i]);
                }
            }
            api.fatInstances = response;
            callback(response);
        }

        function updateFatInstance(objId, obj, callback) {
            for (var i=0; i<api.fatInstances.length; i++) {
                if (api.fatInstances[i]._id == objId) {
                    api.fatInstances[i].username = obj.username;
                    api.fatInstances[i].fat = obj.fat;
                    api.fatInstances[i].date = obj.date;
                    break;
                }
            }
            callback(api.fatInstances);
        }

        /*
         * Methods for Activity data
         */

        function findAllActivityInstances(callback) {
            callback(api.activityInstances);
        }

        function createActivityInstance(obj, callback) {
            var newObj = {
                "_id": (new Date).getTime(),
                "username": obj.username,
                "calories": obj.calories,
                "steps": obj.steps,
                "distance": obj.distance,
                "duration": obj.duration,
                "date": obj.date
            };

            api.activityInstances.push(newObj);
            callback(api.activityInstances);
        }

        function deleteActivityInstanceById(objId, callback) {
            var response = [];
            for (var i=0; i<api.activityInstances.length; i++) {
                if (api.activityInstances[i]._id != objId) {
                    response.push(api.activityInstances[i]);
                }
            }
            api.activityInstances = response;
            callback(response);
        }

        function updateActivityInstance(objId, obj, callback) {
            for (var i=0; i<api.activityInstances.length; i++) {
                if (api.activityInstances[i]._id == objId) {
                    api.activityInstances[i].username = obj.username;
                    api.activityInstances[i].calories = obj.calories;
                    api.activityInstances[i].steps = obj.steps;
                    api.activityInstances[i].distance = obj.distance;
                    api.activityInstances[i].duration = obj.duration;
                    api.activityInstances[i].date = obj.date;
                    break;
                }
            }
            callback(api.activityInstances);
        }

    }
})();