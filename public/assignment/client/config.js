/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "/assignment/client/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "/assignment/client/views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "/assignment/client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "/assignment/client/views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "/assignment/client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/forms", {
                templateUrl: "/assignment/client/views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/fields", {
                templateUrl: "/assignment/client/views/forms/form-fields.view.html",
                controller: "FieldsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();