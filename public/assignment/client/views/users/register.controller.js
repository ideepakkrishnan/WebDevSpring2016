/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $location, UserService) {
        $scope.register = register;

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
                "email": email,
                "roles": ["student"]
            };

            UserService.createUser(
                newUser,
                function(response) {
                    console.log(response);
                    $rootScope.currentUser = response;
                    $location.url("/profile");
            });
        }
    }
})();