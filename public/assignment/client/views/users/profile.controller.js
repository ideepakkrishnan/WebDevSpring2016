/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($location, UserService) {
        var vm = this;
        vm.update = update;

        function init() {
            // Initialization statements
            if (UserService.getCurrentUser()) {
                var currUser = UserService.getCurrentUser();
                vm.userId = currUser._id;
                vm.username = currUser.username;
                vm.password = currUser.password;
                vm.firstName = currUser.firstName;
                vm.lastName = currUser.lastName;
                vm.userEmail = currUser.email;
            } else {
                $location.path("#/home");
            }
        }
        init();

        function update(username, password, firstName, lastName, userEmail) {
            UserService
                .updateUser(
                    vm.userId,
                    {
                        "username": username,
                        "firstName": firstName,
                        "lastName": lastName,
                        "password": password,
                        "email": userEmail
                    }
                )
                .then(function(response){
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                });
        }
    }
})();