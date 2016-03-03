/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("LoginController", loginController);

    function loginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login(username, password) {
            UserService.findUserByCredentials(
                username,
                password,
                function(response) {
                    console.log(response);
                    if (response) {
                        $rootScope.currentUser = response;
                        $location.url("/profile");
                    }
                }
            )
        }
    }
})();