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
                templateUrl: "/assignment/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "/assignment/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "/assignment/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "/assignment/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "/assignment/views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "/assignment/views/forms/forms.view.html",
                controller: "FormsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();