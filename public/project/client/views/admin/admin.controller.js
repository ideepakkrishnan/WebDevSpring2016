/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("AdminController", adminController);

    function adminController(UserService) {
        var vm = this;

        function init() {
            /* Expose functions */
            vm.addUser = addUser;
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.selectUser = selectUser;
            vm.order = order;
            vm.selectedUser = null;

            /* Initialize global variables */
            UserService
                .findAllUsers()
                .then(
                    function(response) {
                        //console.log("admin.controller - init - users: " + JSON.stringify(response));
                        vm.users = response.data;
                    },
                    function (err) {
                        console.log("admin.controller - init - error: " + err.message);
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
        }
        init();

        function addUser() {
            var roles = [];
            if (vm.player) {
                roles.push("player");
            }
            if (vm.watcher) {
                roles.push("watcher");
            }
            if (vm.admin) {
                roles.push("admin");
            }
            UserService.createNewUser(
                {
                    "firstName": vm.newFirstName,
                    "lastName": vm.newLastName,
                    "username": vm.newUsername,
                    "password": vm.newPassword,
                    "email": "",
                    "roles": roles,
                    "teams": [],
                    "goalIds": [],
                    "accessToken": "",
                    "expiresIn": -1,
                    "accountUserId": "",
                    "subscribers": [],
                    "watching": [],
                    "image": ""
                }).then(
                function(response) {
                    vm.selectedUser = null;
                    vm.newFirstName = "";
                    vm.newLastName = "";
                    vm.newUsername = "";
                    vm.newPassword = "";
                    vm.player = false;
                    vm.watcher = false;
                    vm.admin = false;

                    console.log("admin.controller - addUser - response: " + JSON.stringify(response));
                    vm.users = response.data;
                },
                function (err) {
                    console.log("admin.controller - addUser - error: " + err.message);
                }
            );
        }

        function updateUser() {
            var roles = [];
            if (vm.player) {
                roles.push("player");
            }
            if (vm.watcher) {
                roles.push("watcher");
            }
            if (vm.admin) {
                roles.push("admin");
            }

            var updatedDetails = {
                "firstName": vm.newFirstName,
                "lastName": vm.newLastName,
                "username": vm.newUsername,
                "roles": roles
            };

            if (vm.newPassword && vm.newPassword.length > 0) {
                updatedDetails.password = vm.newPassword;
            }

            UserService
                .updateExistingUserById(vm._id, updatedDetails)
                .then(
                    function(response) {
                        vm.selectedUser = null;
                        vm.users = response.data;
                        vm._id = "";
                        vm.firstName = "";
                        vm.lastName = "";
                        vm.username = "";
                        vm.password = "";
                        vm.player = false;
                        vm.watcher = false;
                        vm.admin = false;
                    },
                    function (err) {
                        console.log("admin.controller - updateError - error: " + err.message);
                    }
                );
        }

        function deleteUser(userId) {
            UserService
                .deleteUserById(userId)
                .then(
                    function(response) {
                        vm.users = response.data;
                    },
                    function (err) {
                        console.log("admin.controller - deleteUser - error: " + err.message);
                    }
                );
        }

        function selectUser(user) {
            vm.selectedUser = user;
            vm._id = user._id;
            vm.newFirstName = user.firstName;
            vm.newLastName = user.lastName;
            vm.newUsername = user.username;
            vm.player = user.roles.indexOf('player') >= 0;
            vm.watcher = user.roles.indexOf('watcher') >= 0;
            vm.admin = user.roles.indexOf('admin') >= 0;
        }

        function order(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }
    }
})();