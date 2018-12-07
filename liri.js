require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require("moment");


var thirdArg = process.argv[3];



var finder = process.argv[2];
  if (finder === "spotify-this-song"){
    spotify(thirdArg);
  }
  else if(finder === "concert-this"){
    bandsIntown();
  }
  else if(finder === "movie-this"){
    imdbCredentials();
  }
  else if(finder === "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
      }
      console.log(data);
      var dataArr = data.split(",");
      console.log(dataArr);
      thirdArg = dataArr[1];
      if (dataArr[0]=== "spotify-this-song") {
        spotify();
      }
      else if (dataArr[0]=== "concert-this"){
        bandsIntown();
      }
      else if (dataArr[0]=== "movie-this"){
        imdbCredentials();
      }

    });
  }
// parse data srting into separate variables and call spotify with those variables and call the spotify function i have already created or any other functions created. 



// The finder for the spotify api    
function spotify() {
  var spotifyAPI = new Spotify(keys.spotify);


    if(process.argv.length >= 4){
      thirdArg = process.argv[3];
    }

      spotifyAPI.search({ type: 'track', query: thirdArg, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred:' + err);
        }
        if(data){
          console.log("Artist: " + data.tracks.items[0].artists[0].name);
          console.log(data.tracks.items[0].artists[0].external_urls.spotify);
          console.log("Song name:" + data.tracks.items[0].name)
          console.log("Album the song is from:" + data.tracks.items[0].album.name)
        }          
      });
}


// The finder for Bands in Town 
 
function bandsIntown(){
  console.log("inside bandintown" + thirdArg);
  axios.get("https://rest.bandsintown.com/artists/" + thirdArg + "/events?app_id=codingbootcamp").then(
    function(bandsResponse) {
      console.log(bandsResponse.data[0].venue.name);
      console.log(bandsResponse.data[0].venue.city);
      console.log("Date of the event MM/DD/YYYY: " + moment(bandsResponse.data[0].datetime).format('L'));
    });
}


// The finder for IMDB credentials 

function imdbCredentials (){

  findomdbInfo="";

    if(process.argv.length >= 4){
      findomdbInfo = process.argv[3];
    }
    else(movieInfo = "Mr. Nobody")


  axios.get("http://www.omdbapi.com/?t=" + findomdbInfo+ "&y=&plot=short&apikey=trilogy").then(
    function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("The movie's rating is: " + response.data.imdbRating);
      console.log("The movie's Rotten Tomato rating is: " + response.data.Ratings[1].Value);
      console.log("Country where the movie was produced: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot of the movie: " + response.data.Plot);
      console.log("Actors in the movie " + response.data.Actors);
      
     } 
    );
  }