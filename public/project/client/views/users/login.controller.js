/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("LoginController", loginController);

    function loginController($location, $rootScope, UserService) {
        var vm = this;

        function init() {
            vm.login = login;
            vm.rootScope = $rootScope;
        }
        init();

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };

            UserService
                .login(user)
                .then(
                    function (response) {
                        if (response) {
                            UserService.cacheUserLocally(response.data);
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        console.log(err);
                        $rootScope.errorMessage = "We couldn't log you in. Please try again.";
                    }
                );
        }
    }
})();