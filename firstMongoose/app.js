var mongoose = require('mongoose');
var User = require('./model/user');

mongoose.connect('mongodb://root:root@ds137550.mlab.com:37550/mongoe_x1');

// create new user called chris
var chris = new User({
    name: 'Chris',
    userName: 'sevilayha',
    password: 'password'
});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
chris.dudify(function(err, name){
    if(err) throw err;

    console.log('Your new name is ' + name);
});

// call the built-in save method to save to the database
chris.save(function(err){
    if(err)throw err;

    console.log('User saved successfully!');
})
