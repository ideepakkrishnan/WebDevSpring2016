/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService) {
        var vm = this;

        function init() {
            vm.deleteUser = deleteUser;
            vm.selectUser = selectUser;
            vm.newUser = newUser;
            vm.updateUser = updateUser;
            vm.order = order;

            vm.predicate = 'username';
            vm.reverse = false;
            vm.selectedUser = null;

            // Initialize the admin screen by listing all users
            UserService
                .findAllUsers()
                .then(
                    function (doc) {
                        console.log("admin.controller.init() - fetched users: " + JSON.stringify(doc));
                        vm.users = doc.data;
                    },
                    function (err) {
                        console.log("Error while retrieving user list: " + err.message);
                    }
                );
        }
        init();

        function deleteUser(userId) {
            UserService
                .deleteUserById(userId)
                .then(
                    function (doc) {
                        return UserService.findAllUsers();
                    },
                    function (err) {
                        console.log("Error while deleting user: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        vm.users = doc.data;
                    },
                    function (err) {
                        console.log("Error while retrieving user list: " + err.message);
                    }
                );

            vm.selectedUser = null;
        }

        function selectUser(user) {
            vm.selectedUser = user;
            vm.newUsername = user.username;
            vm.newPassword = user.password;
            vm.newFirstName = user.firstName;
            vm.newLastName = user.lastName;
            vm.newRole = user.roles.toString();
        }

        function newUser() {
            vm.selectedUser = null;

            var newUserDetails = {
                username: vm.newUsername,
                firstName: vm.newFirstName,
                lastName: vm.newLastName,
                password: vm.newPassword,
                email: [],
                phones: [],
                roles: vm.newRole.split(',')
            };

            UserService
                .createNewUser(newUserDetails)
                .then(
                    function (doc) {
                        return UserService.findAllUsers();
                    },
                    function (err) {
                        console.log("Error while creating a new user: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        vm.users = doc.data;
                    },
                    function (err) {
                        console.log("Error while retrieving updated user list: " + err.message);
                    }
                );

            clearFields();
        }

        function updateUser() {
            var updatedUser = {
                username: vm.newUsername,
                firstName: vm.newFirstName,
                lastName: vm.newLastName,
                password: vm.newPassword,
                email: vm.selectedUser.email,
                phones: vm.selectedUser.phones,
                roles: vm.newRole.split(',')
            };

            UserService
                .updateExistingUserById(vm.selectedUser._id, updatedUser)
                .then(
                    function (doc) {
                        return UserService.findAllUsers();
                    },
                    function (err) {
                        console.log("Error while updating user details: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        vm.users = doc.data;
                    },
                    function (err) {
                        console.log("Error while retrieving updated user list: " + err.message);
                    }
                );

            clearFields();
        }

        function clearFields() {
            vm.newUsername = "";
            vm.newFirstName = "";
            vm.newLastName = "";
            vm.newPassword = "";
            vm.newRole = "";

            vm.selectedUser = null;
        }

        function order(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }
    }
})();