/**
 * Created by ideepakkrishnan on 21-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .controller("HomeController", homeController);

    function homeController() {
        var vm = this;

        function init() {
            if (JSON.parse(window.localStorage.getItem("fitbit"))) {
                console.log("Authorized");
                vm.access_token = JSON.parse(window.localStorage.getItem("fitbit")).oauth.access_token;
                vm.expires_in = JSON.parse(window.localStorage.getItem("fitbit")).oauth.expires_in;
                vm.account_user_id = JSON.parse(window.localStorage.getItem("fitbit")).oauth.account_user_id;

                console.log("Access Token: " + vm.access_token);
                console.log("Expires in: " + vm.expires_in);
                console.log("Account User ID: " + vm.account_user_id);
            } else {
                console.log("Unauthorized");
            }
        }
        init();
    }
})();