/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, UserService) {
        $scope.logout = logout;

        function logout() {
            //$rootScope.currentUser = null;
            //$location.url("/home");
            UserService
                .logout()
                .then(
                    function (doc) {
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    },
                    function (err) {
                        console.log("Error while logging out: " + err.message);
                    });
        }
    }
})();