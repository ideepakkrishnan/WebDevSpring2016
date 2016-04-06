/**
 * Created by ideepakkrishnan on 05-04-2016.
 */

module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: {
            type: String,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        teams: [String],
        roles: [String]
    }, {collection: 'user'});
    return userSchema;
};