/**
 * Created by ideepakkrishnan on 21-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("HomeController", homeController);

    function homeController($rootScope) {
        var vm = this;
        vm.rootScope = $rootScope;

        function init() {
            if (JSON.parse(window.localStorage.getItem("fitbit"))) {
                console.log("Authorized");
                $rootScope.access_token = JSON.parse(window.localStorage.getItem("fitbit")).oauth.access_token;
                $rootScope.expires_in = JSON.parse(window.localStorage.getItem("fitbit")).oauth.expires_in;
                $rootScope.account_user_id = JSON.parse(window.localStorage.getItem("fitbit")).oauth.account_user_id;
            } else {
                console.log("Unauthorized");
            }
        }
        init();
    }
})();