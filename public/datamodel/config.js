/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function(){
    angular
        .module("DataModelApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "/datamodel/views/home/home.view.html"
            })
            .when("/user", {
                templateUrl: "/datamodel/views/user/user.view.html",
                controller: "UserController"
            })
            .when("/activity", {
                templateUrl: "/datamodel/views/activity/activity.view.html",
                controller: "ActivityController"
            })
            .when("/fat", {
                templateUrl: "/datamodel/views/fat/fat.view.html",
                controller: "FatController"
            })
            .when("/goal", {
                templateUrl: "/datamodel/views/goal/goal.view.html",
                controller: "GoalController"
            })
            .when("/heart-rate", {
                templateUrl: "/datamodel/views/heartRate/heartRate.view.html",
                controller: "HeartRateController"
            })
            .when("/sleep", {
                templateUrl: "/datamodel/views/sleep/sleep.view.html",
                controller: "SleepController"
            })
            .when("/weight", {
                templateUrl: "/datamodel/views/weight/weight.view.html",
                controller: "WeightController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();