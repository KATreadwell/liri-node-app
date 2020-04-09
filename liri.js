require("dotenv").config();

var keys = require("./keys.js");
var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

function directory(){
    if(command === "concert-this"){
        eventLookup(search);
    }
//add 2 more if and 1 else if
}

console.log(keys);
//will it return exports.spotify?  what is in {}? ID + Secret

//concert-this
//I ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//app_id = codingbootcamp


function eventLookup(artist){
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id+codingbootcamp";
    console.log(artist);
}

directory();





//spotify-this-song
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });
 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });


//movie-this
//axios package api key=trilogy

//do-what-it-says
//fs nod pkg