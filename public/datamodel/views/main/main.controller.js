/**
 * Created by ideepakkrishnan on 03-03-2016.
 */

(function() {
    angular
        .module("DataModelApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }
})();