/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function() {
    angular
        .module("PerformXApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }
})();