/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $http, $location, UserService) {
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
                    $rootScope.user = response;
                    $location.url("#/profile/"+response.username);
                    $http.get("#/profile/"+response.username);
            });
        }
    }
})();