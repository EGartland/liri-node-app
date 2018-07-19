var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var twitter = new Twitter(keys.twitter);
var tUser = "eddiegartland";
var action = process.argv[2].toLowerCase();
var title = process.argv[3];
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
for (i = 4; i < process.argv.length; i++) {
    if (!undefined && !null) {
        title += '+' + process.argv[i];
    }
};
myStuff();
function myStuff() {



    if (action === "spotify-this") {
        spotifyF(action, title);
    }

    if (action === "my-tweets") {
        twitterF(action, title);
    }
    if (action === "movie-this") {
        moviesF(action, title);
    }
    if (action === "do-what-it-says") {
        doWhatF();
    }
};


function twitterF(action, title) {
    twitter.get('statuses/user_timeline', tUser, gotData);
    function gotData(error, data, response) {
        var tweets = data;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
        }
    }
};

function moviesF(action, title) {

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("")
            console.log("Title:                  " + body.Title + '\n');
            console.log("Release Year:           " + body.Year);
            console.log("IMDB Rating:            " + body.imdbRating)
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value)
            console.log("Production Country:     " + body.Country)
            console.log("Language:               " + body.Language)
            console.log("Actors:                 " + body.Actors)
            console.log("Plot:                   " + body.Plot)
        };
    });
};

function spotifyF(action, title) {

    spotify.search({
        type: 'track',
        query: title
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
            var songInfo = data.tracks.items[0];
            console.log("Song Title: " + songInfo.name + '\n');
            console.log("Artist: " + songInfo.artists[0].name + '\n')
            console.log("Album: " + songInfo.album.name + '\n')
            console.log("Preview URL: " + songInfo.preview_url + '\n')
        }
    })
};

function doWhatF() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        var dataArr = data.split(',')

        if (dataArr.length == 2) {
            (dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            (dataArr[0]);
        };
    })
};