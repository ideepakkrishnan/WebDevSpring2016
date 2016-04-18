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
            getActivityData: getActivityData,
            getWeeklyCalorieData: getWeeklyCalorieData,
            getWeeklyDistanceData: getWeeklyDistanceData,
            getWeeklyFloorsData: getWeeklyFloorsData,
            getWeeklyStepsData: getWeeklyStepsData,
            getWeeklyFatData: getWeeklyFatData,
            getWeeklyWeightData: getWeeklyWeightData,
            getWeeklyHeartRateData: getWeeklyHeartRateData,
            getWeeklySleepData: getWeeklySleepData,
            makeRequest: makeRequest
        };
        return api;

        function getWeeklyCalorieData(date) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id + '/activities/calories/date/' + date + '/7d.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

        function getWeeklyDistanceData(date) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id + '/activities/distance/date/' + date + '/7d.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

        function getWeeklyFloorsData(date) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id + '/activities/floors/date/' + date + '/7d.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

        function getWeeklyStepsData(date) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id + '/activities/steps/date/' + date + '/7d.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

        function getWeeklyFatData(date) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id + '/body/log/fat/date/' + date + '/7d.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

        function getWeeklyHeartRateData(date) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id + '/activities/heart/date/' + date + '/7d.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

        function getWeeklyWeightData(date) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id + '/body/log/weight/date/' + date + '/7d.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

        function getWeeklySleepData(date) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : 'https://api.fitbit.com/1/user/' + $rootScope.account_user_id + '/sleep/minutesAsleep/date/' + date + '/7d.json',
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }

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

        function makeRequest(requestURI) {
            var info = $q.defer();

            info = $http({
                method  : 'GET',
                url     : requestURI,
                headers : {'Authorization': 'Bearer ' + $rootScope.access_token}
            });

            return $q.all([info]);
        }
    }
})();