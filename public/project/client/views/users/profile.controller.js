/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, $location, UserService, TeamService) {
        var vm = this;

        function init() {
            vm.update = update;
            vm.deleteTeam = deleteTeam;

            if ($rootScope.currentUser) {
                vm.userId = $rootScope.currentUser._id;
                vm.username = $rootScope.currentUser.username;
                vm.password = $rootScope.currentUser.password;
                vm.firstName = $rootScope.currentUser.firstName;
                vm.lastName = $rootScope.currentUser.lastName;
                vm.userEmail = $rootScope.currentUser.email;
                vm.teams = $rootScope.currentUser.teams;
                vm.roles = $rootScope.currentUser.roles;
                TeamService.fetchTeamDetails(vm.teams)
                    .then(
                        function(response) {
                            console.log(response);
                            vm.myTeams = response.data;
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
            } else {
                $location.path("#/home");
            }
        }
        init();

        function update(username, password, firstName, lastName, userEmail) {
            var updatedDetails = {
                "username": username,
                "firstName": firstName,
                "lastName": lastName,
                "password": password,
                "email": userEmail,
                "teams": vm.teams,
                "roles": vm.roles
            };

            UserService.updateUser(vm.userId, updatedDetails)
                .then(
                    function(response){
                        console.log(response);
                        $rootScope.currentUser = response.data;
                        vm.updated = 1;
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
            vm.teams = teamList;
        }
    }
})();