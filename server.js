var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session = require('express-session');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var passport = require('passport');
var mongoose = require('mongoose');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5610spring2016';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

console.log("Env variable for db host: " + process.env.OPENSHIFT_MONGODB_DB_HOST);
console.log("Connection string: " + connectionString);

// connect to the database
var db = mongoose.connect(connectionString);

console.log("secret: " + process.env.PASSPORT_SECRET);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(session({secret: process.env.PASSPORT_SECRET}));
app.use(session({secret: "cs5610WebDevSpring2016FormMakerDK"}));

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app);

/* Passport changes */

/*
passport.use(new OAuth2Strategy({
        authorizationURL: 'https://www.fitbit.com/oauth2/authorize',
        tokenURL: 'https://api.fitbit.com/oauth2/token',
        clientID: '227G2P',
        clientSecret: 'a26bd15fad11b063d4255831cd9b4a3a',
        callbackURL: "http://localhost:3000/auth/example/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ exampleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

app.get('/auth/example',
    passport.authenticate('oauth2'));

app.get('/auth/example/callback',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
*/