/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("DeveloperController", developerController);

    function developerController($rootScope, UserService, DeveloperService, DeviceService) {
        var vm = this;

        function init() {
            vm.rootScope = $rootScope;

            DeveloperService.generateContent().then(function (doc) {
                console.log(JSON.stringify(doc));
            });

            UserService
                .getCurrentUser()
                .then(
                    function (currUser) {
                        vm.currUser = currUser.data;
                        vm.selectRequest = selectRequest;
                        vm.makeRequest = makeRequest;
                        vm.account_user_id = $rootScope.account_user_id;
                        return DeveloperService.getAllAPIRequests();
                    },
                    function (err) {
                        console.log("profile.controller - init: " + err.message);
                        $rootScope.errorMessage = "You are not logged in!";
                    }
                )
                .then(
                    function (response) {
                        console.log(JSON.stringify(response.data));
                        vm.apiRequestList = response.data;
                    },
                    function (err) {
                        console.log("developer.controller - init() - error: " + err.message);
                        $rootScope.errorMessage = "Oh snap! We were unable to retrieve the API requests. Please try again.";
                    }
                );
        }
        init();

        function selectRequest(requestName) {
            for (var i=0; i<vm.apiRequestList.length; i++) {
                if (vm.apiRequestList[i].reqName == requestName) {
                    vm.currentRequest = vm.apiRequestList[i];
                    break;
                }
            }
        }

        function makeRequest(requestURI) {
            DeviceService.makeRequest(requestURI)
                .then(
                    function (response) {
                        vm.currentResponse = JSON.stringify(response[0].data);
                    },
                    function (err) {
                        vm.currentResponse = "Error code: " + err.code + "Error message: " + err.message
                    }
                );
        }
    }
})();