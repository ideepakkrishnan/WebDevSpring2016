/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService) {
        var vm = this;

        function init() {
            vm.update = update;
            vm.rootScope = $rootScope;

            UserService
                .getCurrentUser()
                .then(
                    function (currUser) {
                        console.log(JSON.stringify(currUser));
                        vm.currUser = currUser.data;
                        vm.userId = currUser.data._id;
                        vm.username = currUser.data.username;
                        vm.firstName = currUser.data.firstName;
                        vm.lastName = currUser.data.lastName;
                        vm.userEmail = currUser.data.email;
                        vm.userImage = currUser.data.image;
                        vm.roles = currUser.data.roles;
                    },
                    function (err) {
                        console.log("profile.controller - init: " + err.message);
                        $rootScope.errorMessage = "You are not logged in!";
                    }
                );
        }
        init();

        function update(username, password, firstName, lastName, userEmail, image) {
            var updatedDetails = {
                "username": username,
                "firstName": firstName,
                "lastName": lastName,
                "email": userEmail,
                "roles": vm.roles,
                "image": image
            };

            if (password && password.length > 0) {
                updatedDetails.password = password;
            }

            UserService.updateUser(vm.userId, updatedDetails)
                .then(
                    function(response){
                        UserService.setCurrentUser(response.data);
                        vm.updated = 1;
                    },
                    function (err) {
                        console.log(err);
                        $rootScope.errorMessage = "Oh snap! We were unable to update your profile. Please try again.";
                    }
                );
        }
    }
})();