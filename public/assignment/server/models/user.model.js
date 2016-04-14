//var mock = require("./user.mock.json");
var q = require("q");
//var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        console.log("user.model.findUserByCredentials - Checking credentials: " + JSON.stringify(credentials));

        UserModel.findOne(
            {username: credentials.username, password: credentials.password},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("user.model.findUserByCredentials - Result: " + JSON.stringify(doc));
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            console.log("user.model - findUserById: " + JSON.stringify(doc));

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({username: username}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        console.log("inside user.model.findAllUsers");

        UserModel.find({}, function (err, doc) {
            console.log("user.model - findAllUsers: " + doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        console.log("exiting user.model.findAllUsers");

        return deferred.promise;
    }

    function createUser(user) {
        // Use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        // Return promise
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find({}, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel.findByIdAndUpdate(
            userId,
            {$set: {
                email: user.email,
                //phones: user.phones,
                roles: user.roles,
                password: user.password,
                username: user.username,
                lastName: user.lastName,
                firstName: user.firstName
            }},
            {new: true},
            function (err, doc) {
            console.log("user.model - updateUser: " + doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

};