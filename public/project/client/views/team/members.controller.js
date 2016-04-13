/**
 * Created by ideepakkrishnan on 12-04-2016.
 */

(function () {
    "use strict";

    angular
        .module("PerformXApp")
        .controller("MembersController", membersController);

    function membersController($rootScope, $location, UserService, TeamService) {
        var vm = this;

        function init() {
            vm.selectMember = selectMember;
            vm.searchForUser = searchForUser;
            vm.addToTeam = addToTeam;
            vm.currentTeam = {};
        }
        init();

        function selectMember(memberId) {
            //TODO: Redirect to stats page for this member
            $location.url('/stats');
        }

        function searchForUser(firstName) {
            UserService
                .searchUsingFirstName(firstName)
                .then(
                    function (doc) {
                        vm.searchResults = doc.data;
                    },
                    function (err) {
                        console.log("Error while searching for user: " + err.message);
                    }
                );
        }

        function addToTeam(username) {
            var teamDetails = {
                teamId: currentTeam._id
            };

            UserService
                .addTeamAffiliation(username, teamDetails)
                .then(
                    function (doc) {
                        return TeamService.fetchTeamDetails([vm.currentTeam._id]);
                    },
                    function (err) {
                        console.log("Error while adding a new team member: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        if (doc.data.length > 0) {
                            vm.currentTeam = doc.data[0];
                            return UserService.getDataForSelectedUsernames(vm.currentTeam.users);
                        }
                    },
                    function (err) {
                        console.log("Error while fetching team details: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        vm.currTeamMembers = doc.data;
                    },
                    function (err) {
                        console.log("Error while retrieving team members details: " + err.message);
                    }
                );
        }
    }
});