var mongoose = require('mongoose');
var User = require('./model/user');

mongoose.connect('mongodb://root:root@ds137550.mlab.com:37550/mongoe_x1');

// create a new user
var newUser = User({
    name: 'Peter Quill',
    userName: 'starlord55',
    password: 'password',
    admin: true
});

// save the user
newUser.save(function(err){
    if(err) throw err;

    console.log('User created!');
});

// get all the users
User.find({}, function(err, users){
    if (err) throw err;

    // object of all the users
    console.log(users);
});

// get the user starlord55
User.find({username: 'startlord55'}, function(err, user){
    if (err) throw err;

    // object of the user
    console.log(user);
});

// get a user with ID of 1
User.findById(1, function(err, user){
    if (err) throw err;


    // show the user
    console.log(user);
});

// get any admin that was created in the past month

// get the date 1 month ago
var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);

User.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, user){
    if (err) throw err;


    // show the admins in the past month
    console.log(users);
});

// get a user with ID of 1
User.findById(1, function(err, user){
    if (err) throw err;

    // change the users location
    user.location = 'uk';

    //save the user
    user.save(function(err){
        if (err) throw err;

        console.log('User successfully updated!');
    });

});

// find the user starlord55
// update him to starlord 88
User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user){
    if (err) throw err;

    // we have the updated user returned to us
    console.log(user);
});

// find the user with id 4
// update username to starlord88
User.findByIdAndUpdate(4, { username: 'starlord88' }, function(err, user){
    if (err) throw err;


    // we have the updated user returned to us
    console.log(user);
});

// get the user starlord55
User.find({ username: 'starlord55' }, function(err, user){
    if (err) throw err;

    // delete him
    user.remove(function(err){
        if (err) throw err;

        console.log('User successfully deleted!');
    });
});

// find the user with id 4
User.findOneAndRemove({ username: 'starlord55' }, function(err){
    if (err) throw err;

    // we have deleted the user
    console.log('User deleted!');
});

// find th euser with id 4
User.findByIdAndRemove(4, function(err){
    if (err) throw err;


    // we have deleted the user
    console.log('User deleted!');
});