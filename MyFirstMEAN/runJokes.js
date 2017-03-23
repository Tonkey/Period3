var request = require('request');

// Options

var allJokes = {
    url: "http://localhost:3000/api/jokes",
    method: "GET",
    json: true
}

var randomJoke = {
    url: "http://localhost:3000/api/joke/random",
    method: 'GET',
    json: true,
}

var getJokeById = {
    url: "http://localhost:3000/api/joke?id=1",
    method: "GET",
    json: true
}

var deleteJoke = {
    url: "http://localhost:3000/api/joke?id=1",
    method: "DELETE",
    json: true
}

var insert = {
    url: "http://localhost:3000/api/joke",
    method: "POST",
    json: true,
    body: {
        "joke": [
        {
            "_id": "1",
            "joke": "this is a test joke",
            "type": [
            "short",
            "joke",
            "test"
        ],
      "reference": {
        "author": "Test",
        "link": "http://someRandomLink.com"
      },
      "lastEdited": new Date()
       }
    ]
    }
}

var updateJoke = {
    url: "http://localhost:3000/api/editJoke",
    method: "POST",
    json: true,
    body: {
        
            "_id": "1",
            "joke": "this is an updated test joke",
            "type": [
            "short",
            "joke",
            "test",
            "updated"
        ],
      "reference": {
        "author": "Test",
        "link": "http://someRandomLink.com"
      },
      "lastEdited": new Date()
       }
    
}

// Request calls

// Get a random joke
request(randomJoke,function(error,res){
    console.log("###RANDOM JOKE:###")
    console.log(res.body.joke);
})

// Get all Jokes
request(allJokes, function(error,res){
    console.log("###ALL JOKES###")
    console.log(res.body.jokes)
})

// CRUD Joke
request(insert, function(error, res){
    console.log("###INSERT JOKE###")
    console.log(res.body.response)
    request(getJokeById, function(error, res){
        console.log("###GET JOKE BY ID###")
        console.log(res.body.joke)
        request(updateJoke, function(error, res){
            console.log("###UPDATE JOKE###")
            console.log(res.body.response)
            request(deleteJoke, function(error,res){
                console.log("###DELETE JOKE###");
                console.log(res.body.response)
            })
        })
    })
})

