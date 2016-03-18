var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var passport = require('passport');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser())

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app);

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