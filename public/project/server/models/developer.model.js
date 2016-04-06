/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

//var mock = require("./developer.mock.json");
var q = require("q");

module.exports = function (db, mongoose) {

    var DeveloperSchema = require("./developer.schema.server.js")(mongoose);

    var DeveloperModel = mongoose.model('developer', DeveloperSchema);

    var api = {
        getAllAPIRequests: getAllAPIRequests
    };
    return api;

    function getAllAPIRequests() {
        var deferred = q.defer();

        DeveloperModel.find({}, function (err, doc) {
            if (err) {
                console.log("developer.model: getAllAPIRequests - error > " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
};