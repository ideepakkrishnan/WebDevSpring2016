/**
 * Created by ideepakkrishnan on 02-03-2016.
 */

(function(){
    angular
        .module("PerformXApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "/project/client/views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "/project/client/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "/project/client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "/project/client/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "/project/client/views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/dashboard", {
                templateUrl: "/project/client/views/dashboard/dashboard.view.html",
                controller: "DashboardController",
            })
            .when("/search", {
                templateUrl: "/project/client/views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/goals", {
                templateUrl: "/project/client/views/goal/goal.view.html",
                controller: "GoalController"
            })
            .when("/team", {
                templateUrl: "/project/client/views/team/team.view.html",
                controller: "TeamController"
            })
            .when("/stats", {
                templateUrl: "/project/client/views/users/stats.view.html",
                controller: "StatsController"
            })
            .when("/callback", {
                templateUrl: "/project/client/views/provider/callback.view.html",
                controller: "CallbackController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();