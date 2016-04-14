/**
 * Created by ideepakkrishnan on 22-02-2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($location, UserService) {

        var vm = this;
        vm.login = login;

        function init() {
            // Initializing statements
        }
        init();

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };

            UserService
                .login(user)
                .then(function(response) {
                    console.log("After logging in: " + JSON.stringify(response.data));
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();