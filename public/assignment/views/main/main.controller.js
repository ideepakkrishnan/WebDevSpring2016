/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }
})();