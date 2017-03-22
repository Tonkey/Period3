var connection = require("../db/db");
// var MongoClient = require('mongodb').MongoClient

// var url = "mongodb://root:root@ds137550.mlab.com:37550/mongoe_x1"

// MongoClient.connect(url, function (err, db) {
//     // assert.equal(null, err);
//     console.log("Connected successfully to server");

//     allJokes(db, function(err, data){
//         console.log("inside data: " + data);
//         db.close();
//     })

// });

// var allJokes = function(db, callback){
exports.allJokes = function(callback){
    var db = connection.get();
    var collection = db.collection('mongoe_x1');

    collection.find({}).toArray(function (err,data){
        result = JSON.stringify(data);
        callback(err, result);
    })
};
exports.findJoke = function(id, callback){};
exports.addJoke = function(jokeToAdd, callback){};
exports.editJoke = function(jokeToEdit, callback){};
exports.deleteJoke = function(id, callback){};
exports.randomJoke = function(randomJoke, callback){};