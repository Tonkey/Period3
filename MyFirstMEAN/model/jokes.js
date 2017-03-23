var connection = require("../db/db");
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var dbName = 'mongoe_x1';
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
    var collection = db.collection(dbName);

    collection.find({}).toArray(function (err,data){
        // result = JSON.stringify(data);
        callback(err, data);
    })
    // db.close();
};
exports.findJoke = function(id, callback){
    var db = connection.get();
    var collection =  db.collection(dbName);

    if(RegExp("^[0-9a-fA-F]{24}$").test(id)){
        collection.find({'_id': ObjectId(id)}).toArray(function(err,data){
            assert.equal(err,null);
            // console.log("Found the following record");
            console.log(data);
            callback(err, data);
        });
    } else {
        collection.find({'_id': id}).toArray(function(err,data){
            assert.equal(err,null);
            // console.log("Found the following record");
            console.log(data);
            callback(err, data);
        });
    }
    // db.close();
};
exports.addJoke = function(jokeToAdd, callback){
    var db = connection.get();
    var collection = db.collection(dbName);

    collection.insert(
        jokeToAdd, {w: 1},function(err, result){
            assert.equal(err, null);
            callback(err,result);
    })
    // db.close();
};
exports.editJoke = function(jokeToEdit, callback){
    var db = connection.get();
    var collection = db.collection(dbName);
    if(RegExp("^[0-9a-fA-F]{24}$").test(jokeToEdit._id)){
        collection.update({_id: ObjectId(jokeToEdit._id)},
            {$set:{
                joke: jokeToEdit.joke,
                type: jokeToEdit.type,
                reference: jokeToEdit.reference,
                lastEdited: new Date()
            }
        }, upsert=false,
        function(err, result){
            callback(err, result)
        }
        )
        
    } else {
        collection.update(
            {_id: jokeToEdit._id},
            {$set: jokeToEdit},
            upsert=false,
            function(err, result){
                callback(err,result)
            }
        )
    }
};
exports.deleteJoke = function(id, callback){
    var db = connection.get();
    var collection = db.collection(dbName);

    if(RegExp("^[0-9a-fA-F]{24}$").test(id)){
        collection.remove({'_id' : ObjectId(id)}, function(err, result){
            assert.equal(err,null);
            callback(err, result);
        })
    } else {
        collection.remove({'_id' : id}, function(err, result){
            assert.equal(err,null);
            callback(err, result);
        })
    }
};
exports.randomJoke = function(randomJoke, callback){
    var db = connection.get();
    var collection = db.collection(dbName);
    // var count = 0;
    collection.aggregate({$sample: {size : 1}}, function(err, result){
        assert.equal(err, null);
        callback(err, result);
    })
    // db.close();
};