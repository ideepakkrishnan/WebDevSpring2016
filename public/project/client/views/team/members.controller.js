/**
 * Created by ideepakkrishnan on 12-04-2016.
 */

(function () {
    "use strict";

    angular
        .module("PerformXApp")
        .controller("MembersController", membersController);

    function membersController($location, $routeParams, UserService, TeamService) {
        var vm = this;

        function init() {
            vm.selectMember = selectMember;
            vm.searchForUser = searchForUser;
            vm.addToTeam = addToTeam;
            vm.deleteTeamMember = deleteTeamMember;

            TeamService
                .fetchTeamDetails($routeParams.id)
                .then(
                    function (doc) {
                        vm.currentTeam = doc.data[0];
                        console.log("members.controller - init - currentTeam: " + vm.currentTeam);
                        return TeamService.findUsersByTeam($routeParams.id);
                    },
                    function (err) {
                        console.log("members.controller - init - error: " + err.message);
                    }
                )
                .then(
                    function (doc) {
                        vm.currTeamMembers = doc.data;
                    },
                    function (err) {
                        console.log("members.controller - init - error: " + err.message);
                    }
                );
        }
        init();

        function selectMember(username) {
            $location.url('/user/' + username + '/stats');
        }

        function searchForUser(name) {
            UserService
                .searchForName(name)
                .then(
                    function (doc) {
                        vm.searchResults = doc.data;
                    },
                    function (err) {
                        console.log("Error while searching for user: " + err.message);
                    }
                );
        }

        function addToTeam(user) {
            var username = user.originalObject.username;

            TeamService
                .addTeamMember(vm.currentTeam._id, username)
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

        function deleteTeamMember(username) {
            TeamService
                .deleteTeamMember(vm.currentTeam._id, username)
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
                        console.log("members.controller - addToTeam - fetched team details: " + JSON.stringify(doc));
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
})();