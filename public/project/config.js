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
                templateUrl: "/project/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "/project/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "/project/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "/project/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "/project/views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/dashboard", {
                templateUrl: "/project/views/dashboard/dashboard.view.html",
                controller: "DashboardController"
            })
            .when("/search", {
                templateUrl: "/project/views/search/search.view.html",
                controller: "SearchController"
            })
            .otherwise({
                redirectTo: "/project/views/404/404.view.html"
            });
    }
})();