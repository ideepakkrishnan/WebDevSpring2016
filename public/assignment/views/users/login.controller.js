/**
 * Created by ideepakkrishnan on 22-02-2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login(username, password) {
            UserService.findUserByCredentials(
                username,
                password,
                function(response) {
                    console.log(response);
                    if (response) {
                        $rootScope.currentUser = response;
                        $location.path("#/profile");
                    }
                }
            );
        }
    }
})();