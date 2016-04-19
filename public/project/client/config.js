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
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/dashboard", {
                templateUrl: "/project/client/views/dashboard/dashboard.view.html",
                controller: "DashboardController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/goals", {
                templateUrl: "/project/client/views/goal/goal.view.html",
                controller: "GoalController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/team", {
                templateUrl: "/project/client/views/team/team.view.html",
                controller: "TeamController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/callback", {
                templateUrl: "/project/client/views/provider/callback.view.html",
                controller: "CallbackController",
                controllerAs: "model"
            })
            .when("/api", {
                templateUrl: "/project/client/views/developer/developer.view.html",
                controller: "DeveloperController",
                controllerAs: "model",
                resolve: {
                    checkDeveloper: checkDeveloper
                }
            })
            .when("/team/:id", {
                templateUrl: "/project/client/views/team/members.view.html",
                controller: "MembersController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/:username/stats", {
                templateUrl: "/project/client/views/users/stats.view.html",
                controller: "StatsController",
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
                function (doc) {
                    // User is Authenticated
                    var user = doc.data;
                    console.log("client config checkAdmin - fetched used: " + JSON.stringify(user));
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

    var checkDeveloper = function($q, $rootScope, UserService)
    {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(
                function (doc) {
                    // User is Authenticated
                    var user = doc.data;
                    console.log("client config checkDeveloper - fetched used: " + JSON.stringify(user));
                    $rootScope.errorMessage = null;
                    if (user !== '0' && user.roles.indexOf('developer') != -1) {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },
                function (err) {
                    console.log("Error while checking if user is a developer: " + err.message);
                    $rootScope.errorMessage = "You should be a developer to access this page.";
                    deferred.reject();
                });

        return deferred.promise;
    };
})();