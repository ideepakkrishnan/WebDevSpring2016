/**
 * Created by ideepakkrishnan on 22-02-2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($scope, $rootScope, $location) {
        if ($rootScope.currentUser) {
            $scope.userId = $rootScope.currentUser._id;
            $scope.username = $rootScope.currentUser.username;
            $scope.password = $rootScope.currentUser.password;
            $scope.firstName = $rootScope.currentUser.firstName;
            $scope.lastName = $rootScope.currentUser.lastName;
            $scope.userEmail = $rootScope.currentUser.email;
        } else {
            $location.path("#/home");
        }
    }
})();