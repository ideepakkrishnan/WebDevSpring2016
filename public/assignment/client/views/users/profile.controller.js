/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController(UserService) {
        var vm = this;
        vm.update = update;

        function init() {
            // Initialization statements
            UserService
                .getCurrentUser()
                .then(
                    function (currUser) {
                        console.log("Initializing profile page: " + JSON.stringify(currUser));
                        vm.currUser = currUser.data;
                        vm.userId = currUser.data._id;
                        vm.username = currUser.data.username;
                        //vm.password = currUser.data.password;
                        vm.firstName = currUser.data.firstName;
                        vm.lastName = currUser.data.lastName;
                        vm.userEmail = (currUser.data.email.length > 0) ? currUser.data.email.toString() : "";
                    },
                    function (err) {
                        console.log("profile.controller - init: " + err.message);
                    }
                );
        }
        init();

        function update(username, password, firstName, lastName, userEmail) {
            var updatedDetails = {
                "username": username,
                "firstName": firstName,
                "lastName": lastName,
                "email": userEmail.split(','),
                "roles": vm.currUser.roles
            };

            if (password && password.length > 0) {
                console.log("Updating password");
                updatedDetails.password = password;
            }

            UserService
                .updateUser(vm.userId, updatedDetails)
                .then(function(response){
                    console.log("profile.controller - update: " + JSON.stringify(response));
                    UserService.setCurrentUser(response.data);
                });
        }
    }
})();