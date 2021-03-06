/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.register = register;

        function init() {
            // Initialization statements
        }
        init();

        function register(username, password, verifyPassword, email) {
            if (password != verifyPassword) {
                console.log("Bad password");
                return false;
            }

            var newUser = {
                "firstName": "",
                "lastName": "",
                "username": username,
                "password": password,
                "email": email.split(',')
                //"phones": ["999-999-9999"],
            };

            UserService
                .createUser(newUser)
                .then(function(response) {
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();