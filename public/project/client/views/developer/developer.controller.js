/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("DeveloperController", developerController);

    function developerController($rootScope, $location, DeveloperService, DeviceService) {
        var vm = this;

        function init() {
            if ($rootScope.currentUser) {
                vm.selectRequest = selectRequest;
                vm.makeRequest = makeRequest;
                vm.account_user_id = $rootScope.account_user_id;

                DeveloperService.getAllAPIRequests()
                    .then(
                        function (response) {
                            console.log(response.data);
                            vm.apiRequestList = response.data;
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

        function selectRequest(requestName) {
            console.log("Searching for: " + requestName);
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