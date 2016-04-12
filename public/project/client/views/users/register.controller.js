/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    "use strict";
    angular
        .module("PerformXApp")
        .controller("RegisterController", registerController);

    function registerController($location, $rootScope, UserService) {
        var vm = this;

        function init() {
            vm.register = register;
        }
        init();

        function register(username, password, verifyPassword, firstName, lastName, email) {
            if (password != verifyPassword) {
                console.log("Bad password");
                return false;
            }

            var newUser = {
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password,
                "email": email,
                "teams": [],
                "roles": ["player", "watcher"],
                "goalIds": [],
                "accessToken": "",
                "expiresIn": 0,
                "accountUserId": "",
                "subscribers": [],
                "watching": []
            };

            UserService
                .createUser(newUser)
                .then(
                    function(response) {
                        if (response) {
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