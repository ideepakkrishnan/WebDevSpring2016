/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("StatsController", statsController);

    function statsController($rootScope, $location, TeamService) {
        var vm = this;

        function init() {
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