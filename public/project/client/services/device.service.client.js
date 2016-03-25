/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

(function () {
    angular
        .module("PerformXApp")
        .factory("DeviceService", deviceService);

    function deviceService($http, $q, $rootScope) {
        var api = {
            getProfileData: getProfileData,
            getActivityData: getActivityData
        };
        return api;

        function getProfileData() {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id +'/profile.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

        function getActivityData(dates) {
            var promises = [];

            angular.forEach(dates, function(date, key){
                promises.push($http({
                        method  : 'GET',
                        url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id +'/activities/date/' + date + '.json',
                        headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
                    })
                );
            });

            return $q.all(promises);
        }
    }
})();