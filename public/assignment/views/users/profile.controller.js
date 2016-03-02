/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, $location, UserService) {
        $scope.update = update;

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

        function update(username, password, firstName, lastName, userEmail) {
            UserService.updateUser(
                $scope.userId,
                {"username": username, "firstName": firstName, "lastName": lastName, "password": password, "email": userEmail},
                function(response){
                    console.log(response);
                    $rootScope.currentUser = response;
                }
            );
        }
    }
})();