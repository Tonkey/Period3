var express = require('express');
var router = express.Router();
var Author = require('../models/author');
var ObjectId = require('mongodb').ObjectId;

router.get('/authors', function(req,res,next){
    Author.find(
        function(err, data){
            res.send({authors: data});
        }
    )
})

router.get('/author/:id', function(req,res,next){
    var id = req.params.id;
    Author.findById(id).exec(function(err, data){
        res.send({author: data});
    })
})

router.post('/author', function(req,res,next){
    var author = new Author(
        {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        }
    )
    

    author.save( function (err) {
        if (err) { return next(err) }
        res.send({author: author});
    })
})

router.delete('/author/:id', function(req,res,next){
    var id = req.params.id;
    Author.findOneAndRemove(id, function(err, result) {
        if (err) { return next(err) }
        res.send({response: result});
    })
})

router.post('/updateAuthor/:id', function(req,res,next){
    var author = new Author(
        {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
            _id:req.params.id
        }
    )

    Author.findByIdAndUpdate(req.params.id, author, {}, function(err, result){
        if (err) { return next(err) }
        res.send({result: author})
    })
})

module.exports = router;