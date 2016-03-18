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
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "/assignment/client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/forms", {
                templateUrl: "/assignment/client/views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/fields", {
                templateUrl: "/assignment/client/views/forms/form-fields.view.html",
                controller: "FieldsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

})();