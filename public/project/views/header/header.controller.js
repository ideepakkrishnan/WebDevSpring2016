/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function() {
    angular
        .module("PerformXApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $rootScope, $location) {
        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            destroyUserCache();
            $location.url("/home")
        }

        function destroyUserCache() {
            window.sessionStorage.removeItem("pxUserCache");
        }
    }
})();