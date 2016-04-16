/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("StatsController", statsController);

    function statsController($rootScope, $location, $routeParams, UserService, TeamService) {
        var vm = this;

        function init() {
            vm.location = $location;

            if ($rootScope.currentUser) {
                UserService
                    .getUserByUsername($routeParams.username)
                    .then(
                        function (doc) {
                            console.log("stats.controller - init() - user: " + JSON.stringify(doc));
                            vm.selectedUser = doc.data;

                            if (vm.selectedUser) {
                                vm.username = vm.selectedUser.username;
                                vm.password = vm.selectedUser.password;
                                vm.firstName = vm.selectedUser.firstName;
                                vm.lastName = vm.selectedUser.lastName;
                                vm.userEmail = vm.selectedUser.email;
                                vm.teams = vm.selectedUser.teams;
                                vm.roles = vm.selectedUser.roles;
                                TeamService.fetchTeamDetails(vm.teams)
                                    .then(
                                        function(response) {
                                            console.log("stats.controller - init - teams: " + JSON.stringify(response));
                                            vm.myTeams = response.data;
                                        },
                                        function (err) {
                                            console.log(err);
                                        }
                                    );
                            }
                        },
                        function (err) {
                            console.log("stats.controller - init() - error: " + err.message);
                        }
                    );

                var div1=d3.select(document.getElementById('div1'));
                var div2=d3.select(document.getElementById('div2'));
                var div3=d3.select(document.getElementById('div3'));
                var div4=d3.select(document.getElementById('div4'));

                start();
            } else {
                $location.path("#/home");
            }
        }
        init();

        function onClick1() {

        }

        function onClick2() {

        }

        function onClick3() {

        }

        function labelFunction(val,min,max) {

        }

        function start() {
            var rp1 = radialProgress(document.getElementById('div1'))
                .label("Sleep")
                .onClick(onClick1)
                .diameter(150)
                .value(78)
                .render();

            var rp2 = radialProgress(document.getElementById('div2'))
                .label("Activity")
                .onClick(onClick2)
                .diameter(150)
                .value(132)
                .render();

            var rp3 = radialProgress(document.getElementById('div3'))
                .label("Weight")
                .onClick(onClick3)
                .diameter(150)
                .minValue(100)
                .maxValue(200)
                .value(150)
                .render();
        }
    }
})();