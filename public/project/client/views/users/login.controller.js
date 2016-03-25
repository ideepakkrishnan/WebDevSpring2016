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
                        console.log(response);
                        if (response) {
                            $rootScope.currentUser = response.data;
                            cacheUserLocally(response.data);
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function cacheUserLocally(user) {
            var userInfo = {
                currentUser: user
            };
            // Caches the user info for this browser session
            window.sessionStorage.setItem("pxUserCache", JSON.stringify(userInfo));
        }
    }
})();