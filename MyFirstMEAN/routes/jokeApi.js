var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");

router.get('/jokes', function(req,res,next){
    jokes.allJokes(function(err,data){
        res.send({jokes: data});
    });
})
router.get('/joke', function(req,res,next){
    console.log(req.query.id)
    jokes.findJoke(req.query.id,function(err,data){
        res.send({joke: data});
        // return data;
    });
})
router.post('/joke', function(req,res,next){
    var joke = req.body.joke;
    // console.log(JSON.stringify(joke));
    jokes.addJoke(joke, function(err,result){
        res.send({response: result});
    });
})
router.post('/editJoke', function(req,res,next){
    var joke = req.body;
    jokes.editJoke(joke, function(err, result){
        // result.joke = joke;
        res.send({response: result});
    });
})
router.delete('/joke', function(req,res,next){
    console.log(req.query.id)
    jokes.deleteJoke(req.query.id, function(err,result){
        res.send({response: result});
    });
})
router.get('/joke/random', function(req,res,next){
    jokes.randomJoke(1, function(err, result){
        res.send({joke: result});
    })
})

module.exports = router;