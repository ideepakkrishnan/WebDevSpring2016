/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("StatsController", statsController);

    function statsController($scope, $rootScope, $location, TeamService) {
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

            var div1=d3.select(document.getElementById('div1'));
            var div2=d3.select(document.getElementById('div2'));
            var div3=d3.select(document.getElementById('div3'));
            var div4=d3.select(document.getElementById('div4'));

            start();
        } else {
            $location.path("#/home");
        }

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