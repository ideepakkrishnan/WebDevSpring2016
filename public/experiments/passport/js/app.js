/**
 * Created by ideepakkrishnan on 04-03-2016.
 */

(function () {
    passport.use(new OAuth2Strategy({
            authorizationURL: 'https://www.example.com/oauth2/authorize',
            tokenURL: 'https://www.example.com/oauth2/token',
            clientID: EXAMPLE_CLIENT_ID,
            clientSecret: EXAMPLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/example/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOrCreate({ exampleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
})();