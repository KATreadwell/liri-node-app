if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

function directory(command, search) {
    if (command === "concert-this") {
        eventLookup(search);
    }
    else if (command === "spotify-this-song") {
        songLookup(search);
    }
    else if (command === "movie-this") {
        movieLookup(search);
    }
    else {
        random();
    }
}

//used to convert datetime to date field for bands in town. 
const convertDate = function (date, format) {
    let today = new Date(date);
    let dd = today.getDate() + 1,
        mm = today.getMonth() + 1,
        yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

//bands in town
function eventLookup(search) {
    axios.get("https://rest.bandsintown.com/artists/" + search.trim() + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("The venue is " + response.data[i].venue.name);
                console.log("The band will be playing in " + response.data[i].venue.city);
                console.log("On " + convertDate(response.data[i].datetime));
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

//spotify this song, empty search no longer works
function songLookup(search) {
    if (search === "") {
        search = 'The Sign';
    }
    spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songResult = data.tracks.items[0];
        console.log("Artist Name: " + songResult.artists[0].name);
        console.log("Song Name: " + songResult.name);
        console.log("Preview Link: " + songResult.preview_url);
        console.log("Album: " + songResult.album.name);
    });
}

//movie-this
function movieLookup(search) {
    if (search === "") {
        search = 'Mr. Nobody';
    }
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    )
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};


//do-what-it-says
//for my program, basically run "node liri.js" and it will pull the command and the search from random.txt
//run spotify-this-song for "I Want it That Way" from random.txt, can also replace text for movie-this and concert-this
//works great except for concert-this
function random() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var dataArr = data.split(",");
        var command = dataArr[0];
        var search = dataArr[1];

        directory(command, search) 
    })
}

directory(command, search)