/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("DeveloperController", developerController);

    function developerController($rootScope, $location, DeveloperService) {
        var vm = this;

        function init() {
            if ($rootScope.currentUser) {
                vm.selectRequest = selectRequest;

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
            for (var i=0; i<vm.apiRequestList.length; i++) {
                if (vm.apiRequestList[i].reqName == requestName) {
                    vm.currentRequest = vm.apiRequestList[i];
                    console.log(vm.currentRequest);
                    break;
                }
            }
        }
    }
})();