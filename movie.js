const OMDB_URL = ` http://www.omdbapi.com/?&apikey=2fbb32ba&t=`;

function getData(searchTerm, callback) {
    const query = {
        s: `${searchTerm}`,
        per_page: 5,
        i: ''
    }
    $.getJSON(`${OMDB_URL}${searchTerm}&format=json`, callback);
}

function renderHtmlElements(movie) {
    console.log(movie);

    return `<div class="poster-box">
        <img class="img-shape" src="${movie.Poster}" alt="movie img">
       
        
        <h2>${movie.Title}</h2>
        <a href="${movie.Website}"><button>Website</button></a><span>(If Applicable)</span>
        <p>${movie.Genre}</p>
        <p>${movie.Plot}</p>
        <p>Released: ${movie.Released}</p>
        <p>${movie.Actors}</p>
        <p>Runtime: ${movie.Runtime}</p>
        <p>${movie.Production}</p>
        </div>`;

}

function htmlEnter(data) {

    $('.movie-search-results').html(renderHtmlElements(data));

}

function handleSubmit() {
    $('#js-form').on('submit', function (e) {
        e.preventDefault();
        const queryTarget = $(event.currentTarget).find('#js-movie-search');
        const query = queryTarget.val();
        getData(query, htmlEnter);
        $('.curtain').hide();


    });
}
function hiddenElements() {
    $('.header').hide();
    $('.container').hide();
    $('.js-movie-search').hide();
    $('.video-display').hide();
}

function openingTranstion() {
    $('.curtain').on('click', function () {

        $('.header').slideToggle(900);
        $('.container').slideToggle(800);
        $('.js-movie-search').show();
        $('.video-display').show(800);
    });
}

function stopCurtainAnimation(){
    
    $('.boxed').on('hover',function(){
        alert('click');
      
    });
}

function containedFuncs() {
    handleSubmit();
    openingTranstion();
    hiddenElements();
    stopCurtainAnimation();
}
$(containedFuncs)








