/**
 * Created by ideepakkrishnan on 03-03-2016.
 */

(function () {
    angular
        .module("DataModelApp")
        .controller("UserController", userController);

    function userController($scope, HealthDataService) {
        /* Expose functions */
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        /* Map models
        $scope.firstName = firstName;
        $scope.lastName = lastName;
        $scope.username = username;
        $scope.password = password;
        $scope.email = userEmail;
        $scope.dob = dob;
        $scope.city = city;
        $scope.country = country;
        $scope.player = player;
        $scope.watcher = watcher;
        $scope.admin = admin;*/

        /* Initialize global variables */
        HealthDataService.findAllUsers(
            function(response) {
                $scope.users = response;
            }
        );

        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        /* Custom functions */
        Date.prototype.formatDDMMMYYYY = function() {
            return this.getDate() + "-" + month[this.getMonth()] + "-" + this.getFullYear();
        }

        function addUser() {
            var roles = [];
            if ($scope.player) {
                roles.push("player");
            }
            if ($scope.watcher) {
                roles.push("watcher");
            }
            if ($scope.admin) {
                roles.push("admin");
            }
            HealthDataService.createUser(
                {"firstName": $scope.firstName, "lastName": $scope.lastName, "username": $scope.username, "password": $scope.password,
                    "email": $scope.userEmail, "roles": roles, "dob": (new Date($scope.dob)).formatDDMMMYYYY(),
                    "city": $scope.city, "country": $scope.country},
                function(response) {
                    console.log(response);
                    $scope.users = response;
                    $scope.firstName = "";
                    $scope.lastName = "";
                    $scope.username = "";
                    $scope.password = "";
                    $scope.userEmail = "";
                    $scope.dob = "";
                    $scope.city = "";
                    $scope.country = "";
                    $scope.player = false;
                    $scope.watcher = false;
                    $scope.admin = false;
                }
            )
        }

        function updateUser() {
            var roles = [];
            if ($scope.player) {
                roles.push("player");
            }
            if ($scope.watcher) {
                roles.push("watcher");
            }
            if ($scope.admin) {
                roles.push("admin");
            }
            HealthDataService.updateUser(
                $scope._id,
                {"firstName": $scope.firstName, "lastName": $scope.lastName, "username": $scope.username, "password": $scope.password,
                    "email": $scope.userEmail, "roles": roles, "dob": (new Date($scope.dob)).formatDDMMMYYYY(),
                    "city": $scope.city, "country": $scope.country},
                function(response) {
                    console.log(response);
                    $scope.users = response;
                    $scope.firstName = "";
                    $scope.lastName = "";
                    $scope.username = "";
                    $scope.password = "";
                    $scope.userEmail = "";
                    $scope.dob = "";
                    $scope.city = "";
                    $scope.country = "";
                    $scope.player = false;
                    $scope.watcher = false;
                    $scope.admin = false;
                }
            )
        }

        function deleteUser(userId) {
            HealthDataService.deleteUserById(
                userId,
                function(response) {
                    console.log(response);
                    $scope.users = response;
                }
            )
        }

        function selectUser(user) {
            $scope._id = user._id;
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            $scope.username = user.username;
            $scope.password = user.password;
            $scope.userEmail = user.email;
            $scope.dob = new Date(user.dob);
            $scope.city = user.city;
            $scope.country = user.country;
            $scope.player = user.roles.indexOf('player') >= 0;
            $scope.watcher = user.roles.indexOf('watcher') >= 0;
            $scope.admin = user.roles.indexOf('admin') >= 0;
        }
    }
})();