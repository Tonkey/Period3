var jokeAPI = require('./model/jokes');

jokeAPI.allJokes(function(err, data){
    console.log(data);
})