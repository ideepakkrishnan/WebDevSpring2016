/**
 * Created by ideepakkrishnan on 29-03-2016.
 */

module.exports = function (mongoose) {
    // Declaring User schema
    var userSchema = mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String,
        password: String,
        email: {type: [String], match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
        phones: {type: [String], match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/},
        roles: [String]
    }, {collection: 'user'});
    return userSchema;
};