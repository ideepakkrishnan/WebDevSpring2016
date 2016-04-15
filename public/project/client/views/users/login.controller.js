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
        }
        init();

        function login(username, password) {
            UserService.findUserByCredentials(username, password)
                .then(
                    function (response) {
                        if (response) {
                            console.log("login.controller - login - user: " + JSON.stringify(response));
                            $rootScope.currentUser = response.data;
                            UserService.cacheUserLocally(response.data);
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
    }
})();