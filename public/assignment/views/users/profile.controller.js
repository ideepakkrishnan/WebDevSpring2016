/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService) {
        $scope.update = update;

        if ($rootScope.currentUser) {
            userId = $rootScope.currentUser.userId;
            username = $rootScope.currentUser.username;
            password = $rootScope.currentUser.password;
            firstName = $rootScope.currentUser.firstName;
            lastName = $rootScope.currentUser.lastName;
            userEmail = $rootScope.currentUser.email;
        }

        function update(username, password, firstName, lastName, userEmail) {
            UserService.updateUser(
                userId,
                {"username": username, "firstName": firstName, "lastName": lastName, "password": password, "email": userEmail},
                function(response){
                    console.log(response);
                    $rootScope.currentUser = response;
                }
            );
        }
    }
})();