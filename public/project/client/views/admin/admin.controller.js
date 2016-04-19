/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("AdminController", adminController);

    function adminController($rootScope, UserService) {
        var vm = this;

        function init() {
            /* Expose functions */
            vm.addUser = addUser;
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.selectUser = selectUser;
            vm.order = order;
            vm.selectedUser = null;
            vm.rootScope = $rootScope;

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
                        $rootScope.errorMessage = "Oh snap! We were unable to fetch the user list. Please try again.";
                    }
                );
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
            if (vm.developer) {
                roles.push("developer");
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
                    vm.developer = false;
                    vm.users = response.data;
                },
                function (err) {
                    console.log("admin.controller - addUser - error: " + err.message);
                    $rootScope.errorMessage = "Oh snap! We were unable to create the user. Please try again.";
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
            if (vm.developer) {
                roles.push("developer");
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
                        vm.developer = false;
                    },
                    function (err) {
                        console.log("admin.controller - updateError - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to update the user details. Please try again.";
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
                        $rootScope.errorMessage = "Oh snap! We were unable to delete the user. Please try again.";
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
            vm.developer = user.roles.indexOf('developer') >= 0;
        }

        function order(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }
    }
})();