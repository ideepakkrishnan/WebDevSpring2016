/**
 * Created by ideepakkrishnan on 10-02-2016.
 */

(function() {
    angular
        .module("MovieDBApp", [])
        .controller("MovieListController", theController);

    function theController($scope){

        var movies = [
            {id: 1, title: "Avatar", year: 2010}
            {id: 2, title: "Star Wars", year: 1977}
        ];

        $scope.moviesList = movies;
    }
})();