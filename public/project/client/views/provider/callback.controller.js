/**
 * Created by ideepakkrishnan on 21-03-2016.
 */

(function () {
    "use strict";
    angular
        .module("PerformXApp")
        .controller("CallbackController", callbackController);

    function callbackController($location, $rootScope, UserService) {
        var vm = this;

        function init() {
            if(UserService.getCurrentUser()) {
                var response = $location.url().split("#")[1];
                var responseParams = response.split("&");
                var paramMap = [];
                for(var i = 0; i < responseParams.length; i++) {
                    paramMap[responseParams[i].split("=")[0]] = responseParams[i].split("=")[1];
                }
                if(paramMap.access_token !== undefined && paramMap.access_token !== null) {
                    var fitbit = {
                        oauth: {
                            access_token: paramMap.access_token,
                            expires_in: paramMap.expires_in,
                            account_user_id: paramMap.user_id
                        }
                    };
                    //window.localStorage.setItem("fitbit", JSON.stringify(fitbit));
                    $rootScope.fitbitAuthDetails = fitbit;

                    // Change this redirect link to wherever your dashboard is located.
                    $location.path("#/dashboard");
                } else {
                    alert("Problem authenticating");
                    $rootScope.errorMessage = "Oh snap! We couldn't connect your FitBit account.";
                }
            } else {
                $location.path("#/home");
            }
        }
        init();
    }
})();