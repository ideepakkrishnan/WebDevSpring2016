/**
 * Created by ideepakkrishnan on 03-02-2016.
 */
(function(){
    $(init);

    var $movieTitleTxt;
    var $searchMovieBtn;
    var searchUrl = "http://wwww.omdbapi.com/?s=TITLE&page=PAGE";

    function init() {
        $movieTitleTxt = $("#movieTitleTxt");
        $searchMovieBtn = $("#searchMovieBtn")

        $searchMovieBtn.click(searchMovie);
    }

    function searchMovie(){
        var movieTitle = $movieTitleTxt.val();

        //Query the API
        var url = searchUrl
            .replace("TITLE", movieTitle)
            .replace("PAGE", 1);

        $.ajax({
            url: url,
            success: renderMovieList
        });
    }

    function renderMovieList(response){
        alert("Movie list")
    }
})();