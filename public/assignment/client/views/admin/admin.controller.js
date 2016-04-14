/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($rootScope, UserService) {
        var vm = this;

        function init() {
            vm.deleteUser = deleteUser;
            vm.selectUser = selectUser;
            vm.newUser = newUser;
            vm.updateUser = updateUser;

            vm.selectedUser = null;

            // Initialize the admin screen by listing all users
            UserService
                .findAllUsers()
                .then(
                    function (doc) {
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
                .updateUser(vm.selectedUser._id, updatedUser)
                .then(
                    function (doc) {
                        console.log("Updated user details: " + JSON.stringify(doc.data));
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

            vm.selectedUser = null;
        }
    }
})();