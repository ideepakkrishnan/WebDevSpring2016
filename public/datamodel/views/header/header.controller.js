/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function() {
    angular
        .module("DataModelApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $rootScope, $location) {
        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home")
        }
    }
})();