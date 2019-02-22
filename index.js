const YOUTUBE_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search`;
const OMDB_URL = ` https://www.omdbapi.com/?&apikey=2fbb32ba&t=`;


//retrieve youtube data 
function extractDataFromApi(searchterm, callback) {
    const query = {
        part: "snippet",
        key: `AIzaSyCAAxPOe61eXNjmv24UHXhI-MVduG0ZC6g`,
        maxResults: 3,
        videoType: `movie`,
        type: `video`,
        q: searchterm

    };
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}

//retrieve OMDB data
function getData(searchTerm, callback) {
    const query = {
        s: `${searchTerm}`,
        p: 1 - 20,
        i: ''
    }
    $.getJSON(`${OMDB_URL}${searchTerm}&type=movie&format=json`, callback);

}

function getHtmlElements(results) {

    return `
             <div class=video-container>
             <h2><a href="https://www.youtube.com/watch?v=${results.id.videoId}" target"_blank">
             <img class="youtube-img" src='${results.snippet.thumbnails.medium
            .url}'</h2>
            </div> `
}

function renderHtmlElements(movie) {
    return `<div class="poster-box">
        <img class="img-shape" src="${movie.Poster}" alt="movie img">
       
       
        <h2>${movie.Title}</h2>
        <a href="${movie.Website}">View Website</a>
        <p>${movie.Genre}</p>
        <p>${movie.Plot}</p>
        <p>Released: ${movie.Released}</p>
        <p>${movie.Actors}</p>
        <p>Runtime: ${movie.Runtime}</p>
        <p>${movie.Production}</p>
        </div>`;
}

//movie callback 
function htmlEnter(data) {
    $('.movie-search-results').html(renderHtmlElements(data));

}

//Youtube callbqck
function captureDataForHtml(data) {
    const info = data.items.map((item, index) => getHtmlElements(item))

    $('.video-display').html(info);

}

function handleSubmittedRequest() {
    $('#js-form').on('submit', function (e) {
        e.preventDefault();
        const queryTargeted = $(event.currentTarget).find('#js-movie-search');
        const Query = queryTargeted.val();
        queryTargeted.val("");
        extractDataFromApi(Query, captureDataForHtml);
        getData(Query, htmlEnter);
        $('footer').show();
        $('html,body').animate({ scrollTop: $('.movie-search-results').offset().top }, 300);
        return false;
    });
}

function hiddenElements() {
    $('.container').hide();
    $('#js-movie-search').hide();
    $('.video-display').hide();
    $('footer').hide();
}

function openingTranstion() {
    $('#pop-corn').on('click', function () {
        $(this).hide();
        $('.container').show(00);
        $('#js-movie-search').show();
        $('.video-display').show(800);
        $('.open-text').hide(400);
    });
}

function containedFuncs() {
    openingTranstion();
    hiddenElements();
    handleSubmittedRequest();
}
$(containedFuncs)
