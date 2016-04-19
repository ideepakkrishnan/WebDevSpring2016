/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

(function () {
    "use strict";

    angular
        .module("PerformXApp")
        .factory("DeveloperService", developerService);

    function developerService($http) {
        var api = {
            getAllAPIRequests: getAllAPIRequests,
            generateContent: generateContent
        };
        return api;

        function getAllAPIRequests() {
            return $http.get("/api/project/api");
        }

        function generateContent() {
            return $http.put("/api/project/api", {add: 1});
        }
    }
})();