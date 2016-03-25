/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, $location, UserService, TeamService) {
        $scope.update = update;
        $scope.deleteTeam = deleteTeam;

        if ($rootScope.currentUser) {
            $scope.userId = $rootScope.currentUser._id;
            $scope.username = $rootScope.currentUser.username;
            $scope.password = $rootScope.currentUser.password;
            $scope.firstName = $rootScope.currentUser.firstName;
            $scope.lastName = $rootScope.currentUser.lastName;
            $scope.userEmail = $rootScope.currentUser.email;
            $scope.teams = $rootScope.currentUser.teams;
            $scope.roles = $rootScope.currentUser.roles;
            TeamService.fetchTeamDetails($scope.teams)
                .then(
                    function(response) {
                        console.log(response);
                        $scope.myTeams = response.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        } else {
            $location.path("#/home");
        }

        function update(username, password, firstName, lastName, userEmail) {
            var updatedDetails = {
                "username": username,
                "firstName": firstName,
                "lastName": lastName,
                "password": password,
                "email": userEmail,
                "teams": $scope.teams,
                "roles": $scope.roles
            };

            UserService.updateUser($scope.userId, updatedDetails)
                .then(
                    function(response){
                        console.log(response);
                        $rootScope.currentUser = response.data;
                        $scope.updated = 1;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function deleteTeam(teamId) {
            var teamList = [];
            for (var j=0; j<$rootScope.currentUser.teams.length; j++) {
                if ($rootScope.currentUser.teams[j] != teamId) {
                    teamList.push($rootScope.currentUser.teams[j]);
                }
            }
            $scope.teams = teamList;
        }
    }
})();