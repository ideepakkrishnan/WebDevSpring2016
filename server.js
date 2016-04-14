var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser'); // passport dependency
var session = require('express-session'); // passport dependency
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

//console.log("Env variable for db host: " + process.env.OPENSHIFT_MONGODB_DB_HOST);
//console.log("Connection string: " + connectionString);

// connect to the database
var db = mongoose.connect(connectionString);

//console.log("secret: " + process.env.PASSPORT_SECRET);

// configuring session
// [maintain the following order: bodyParser, session, cookieParser, passport]
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true})); // passport changes
app.use(
    session({
        secret: process.env.PASSPORT_SECRET, // Encrypts the cookie using this secret key
        resave: true,
        saveUninitialized: true
    })
); // passport changes
app.use(cookieParser()); // passport changes

// Initialize passport
app.use(passport.initialize()); // Extends the current express object
// For eg. once successfully logged in, passport adds the current user into
// req.user (req, res objects are provided by express). In addition, several
// utility functions are also added
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose);