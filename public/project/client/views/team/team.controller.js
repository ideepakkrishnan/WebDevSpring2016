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
            vm.deleteTeamMember = deleteTeamMember;
            vm.addUserToTeam = addUserToTeam;
            vm.location = $location;

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

        function deleteTeamMember(teamId) {
            TeamService
                .deleteTeamMember(teamId, $rootScope.currentUser.username)
                .then(
                    function (doc) {
                        return UserService.deleteTeamAffiliation(teamId, [$rootScope.currentUser._id]);
                    },
                    function (err) {
                        console.log("team.controller - deleteTeamMember - Error: " + err.message);
                    }
                ).then(
                function (doc) {
                    return UserService.getUserByUsername($rootScope.currentUser.username);
                },
                function (err) {
                    console.log("team.controller - deleteTeamMember - Error: " + err.message);
                }).then(
                function (doc) {
                    console.log("team.controller - deleteTeamMember - user: " + JSON.stringify(doc));
                    $rootScope.currentUser = doc.data;
                    getAffiliatedTeamDetails();
                },
                function (err) {
                    console.log("team.controller - deleteTeamMember - Error: " + err.message);
                }
            );
        }

        function addUserToTeam(team) {
            var teamDetails = {
                teamId: team.originalObject._id
            };

            UserService
                .addTeamAffiliation($rootScope.currentUser.username, teamDetails)
                .then(
                    function (doc) {
                        console.log("After adding team affiliation: " + JSON.stringify(doc.data));
                        $rootScope.currentUser = doc.data;
                        return TeamService.addTeamMember(team.originalObject._id, doc.data.username);
                    },
                    function (err) {
                        console.log("Error while adding team affiliation" + err.message);
                    }
                )
                .then(
                    function (doc) {
                        console.log("team.controller - addUserToTeam - Updated team: " + JSON.stringify(doc));
                        return TeamService.fetchTeamDetails($rootScope.currentUser.teams);
                    },
                    function (err) {
                        console.log("Error while adding team affiliation" + err.message);
                    }
                )
                .then(
                    function (doc) {
                        vm.myTeams = doc.data;
                    },
                    function (err) {
                        console.log("Error while adding team affiliation" + err.message);
                    }
                );
        }
    }
})();