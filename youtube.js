const YOUTUBE_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search`;

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

function getHtmlElements(results) {
    console.log(results);

    return `
             <div class=video-container>
             <h2><a href="https://www.youtube.com/watch?v=${results.id.videoId}" target"_blank">
             <img class="youtube-img" src='${results.snippet.thumbnails.medium
            .url}' alt='${results.snippet.title}'><br>${results.snippet.title}</a></h2>
              <a href='https://www.youtube.com/channel/${results.snippet
            .channelId}' target='_blank'>${results.snippet.channelTitle}</a>
            </div> `
}

function captureDataForHtml(data) {
    console.log(data);
    const info = data.items.map((item, index) => getHtmlElements(item))

    $('.video-display').html(info);

}

function handleSubmittedRequest() {
    $('#js-form').on('submit', function (e) {
        e.preventDefault();
        const queryTargeted = $(event.currentTarget).find('#js-movie-search');
        const tubeQuery = queryTargeted.val();
        queryTargeted.val("");
        extractDataFromApi(tubeQuery, captureDataForHtml);
    });
}

$(handleSubmittedRequest);