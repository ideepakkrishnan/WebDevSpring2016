/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/profile/:username", {
                templateUrl: "/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "/views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "/views/forms/forms.view.html",
                controller: "FormsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();