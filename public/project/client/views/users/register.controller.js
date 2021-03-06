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
            vm.rootScope = $rootScope;
        }
        init();

        function register(username, password, verifyPassword, firstName, lastName, email, image) {
            if (password != verifyPassword) {
                console.log("Bad password");
                $rootScope.errorMessage = "The passwords doesn't match. Please correct this.";
                return false;
            }

            var roles = [];

            if (vm.admin == 1) {
                roles.push('admin');
            }

            if (vm.watcher == 1) {
                roles.push('watcher');
            }

            if (vm.player == 1) {
                roles.push('player');
            }

            if (vm.developer == 1) {
                roles.push('developer');
            }

            var newUser = {
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password,
                "email": email,
                "teams": [],
                "roles": roles,
                "goalIds": [],
                "accessToken": "",
                "expiresIn": 0,
                "accountUserId": "",
                "subscribers": [],
                "watching": [],
                "image": image
            };

            UserService
                .createUser(newUser)
                .then(
                    function(response) {
                        if (response) {
                            UserService.setCurrentUser(response.data);
                            UserService.cacheUserLocally(response.data);
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        console.log(err);
                        $rootScope.errorMessage = "Oh snap! We were unable to register you. Please try again.";
                    }
                );
        }
    }
})();