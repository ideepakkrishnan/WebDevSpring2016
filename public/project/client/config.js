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
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "/project/client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "/project/client/views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "/project/client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/dashboard", {
                templateUrl: "/project/client/views/dashboard/dashboard.view.html",
                controller: "DashboardController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "/project/client/views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/goals", {
                templateUrl: "/project/client/views/goal/goal.view.html",
                controller: "GoalController",
                controllerAs: "model"
            })
            .when("/team", {
                templateUrl: "/project/client/views/team/team.view.html",
                controller: "TeamController",
                controllerAs: "model"
            })
            .when("/stats", {
                templateUrl: "/project/client/views/users/stats.view.html",
                controller: "StatsController",
                controllerAs: "model"
            })
            .when("/callback", {
                templateUrl: "/project/client/views/provider/callback.view.html",
                controller: "CallbackController",
                controllerAs: "model"
            })
            .when("/api", {
                templateUrl: "/project/client/views/developer/developer.view.html",
                controller: "DeveloperController",
                controllerAs: "model"
            })
            .when("/members", {
                templateUrl: "/project/client/views/team/members.view.html",
                controller: "MembersController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();