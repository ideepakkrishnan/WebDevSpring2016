/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("TeamController", teamController);

    function teamController($rootScope, $location, TeamService, UserService) {
        var vm = this;

        function init() {
            vm.createTeam = createTeam;
            vm.selectTeam = selectTeam;
            vm.updateTeam = updateTeam;
            vm.deleteTeam = deleteTeam;
            vm.getAffiliatedTeamDetails = getAffiliatedTeamDetails;

            if ($rootScope.currentUser) {
                // Initialize team data
                getAffiliatedTeamDetails();
            } else {
                $location.path("#/home");
            }
        }
        init();

        function createTeam() {
            if (vm.newTeamName) {
                var newTeam = {
                    name: vm.newTeamName,
                    description: vm.newTeamDesc,
                    image: vm.newTeamImage,
                    users: [$rootScope.currentUser.username]
                };

                TeamService
                    .createTeam(newTeam)
                    .then(
                        function (doc) {
                            var teamDetails = {
                                teamId: doc.data._id
                            };

                            return UserService.addTeamAffiliation($rootScope.currentUser.username, teamDetails);
                        },
                        function (err) {
                            console.log(err);
                        })
                    .then(
                        function (doc) {
                            console.log("After adding team affiliation: " + JSON.stringify(doc.data));
                            $rootScope.currentUser = doc.data;
                            return TeamService.fetchTeamDetails(doc.data.teams);
                        },
                        function (err) {
                            console.log("Error while adding team affiliation" + err);
                        }
                    )
                    .then(
                        function (doc) {
                            vm.myTeams = doc.data;
                            $('#newTeamModal').modal('hide');
                        },
                        function (err) {
                            console.log("Error while fetching team details: " + err);
                        }
                    );
            }

            vm.newTeamName = "";
            vm.newTeamDesc = "";
            vm.newTeamImage = "";
        }

        function updateTeam() {
            var updatedTeamInfo = {
                name: vm.updatedTeamName,
                description: vm.updatedTeamDesc,
                image: vm.updatedTeamImage,
                users: vm.updatedTeamMembers
            }

            TeamService
                .updateTeamById(vm.updatedTeamId, updatedTeamInfo)
                .then(
                    function (doc) {
                        console.log("Updated team details: " + JSON.stringify(doc.data));
                        getAffiliatedTeamDetails();
                    },
                    function (err) {
                        console.log("Error while updating team details: " + err);
                    }
                );

            vm.updatedTeamId = null;
            vm.updatedTeamName = "";
            vm.updatedTeamDesc = "";
            vm.updatedTeamImage = "";
            vm.updatedTeamMembers = [];
        }

        function deleteTeam(teamId) {
            TeamService.deleteTeamById(teamId).then(
                function (doc) {
                    getAffiliatedTeamDetails();
                },
                function (err) {
                    console.log("Error while deleting team: " + err);
                }
            );
        }

        function selectTeam(teamId, teamName, teamDesc, teamImg, teamMembers) {
            vm.updatedTeamId = teamId;
            vm.updatedTeamName = teamName;
            vm.updatedTeamDesc = teamDesc;
            vm.updatedTeamImage = teamImg;
            vm.updatedTeamMembers = teamMembers;
        }

        function getAffiliatedTeamDetails() {
            TeamService.fetchTeamDetails($rootScope.currentUser.teams).then(
                function (doc) {
                    vm.myTeams = doc.data;
                },
                function (err) {
                    console.log("Error while fetching team details: " + err);
                }
            );
        }
    }
})();