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
                    checkLoggedIn: checkAdmin
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
            .when("/fields/:formId", {
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

    var checkLoggedIn = function($q, $location, $rootScope, UserService) {
        var deferred = $q.defer();
        $rootScope.errorMessage = null;

        UserService
            .getCurrentUser()
            .then(
                function (response) {
                    var currentUser = response.data;
                    console.log("Fetching current user from the server: " + JSON.stringify(currentUser));
                    if (currentUser) {
                        $rootScope.errorMessage = null;
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        $rootScope.errorMessage = 'You need to log in.';
                        deferred.reject();
                        $location.url("/home");
                    }
                },
                function (err) {
                    console.log("Error while checking for logged in user: " + err.message);
                    $rootScope.errorMessage = 'We are experiencing unknown server issues. Please try again!';
                    deferred.reject();
                });
        return deferred.promise;
    };

    var checkAdmin = function($q, $rootScope, UserService)
    {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(
                function (user) {
                    // User is Authenticated
                    $rootScope.errorMessage = null;
                    if (user !== '0' && user.roles.indexOf('admin') != -1) {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },
                function (err) {
                    console.log("Error while checking if user is admin: " + err.message);
                    $rootScope.errorMessage = "You should be an admin user to access this page.";
                    deferred.reject();
                });

        return deferred.promise;
    };

})();