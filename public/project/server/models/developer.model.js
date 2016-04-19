/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

//var mock = require("./developer.mock.json");
var q = require("q");

module.exports = function (db, mongoose) {

    var DeveloperSchema = require("./developer.schema.server.js")(mongoose);

    var DeveloperModel = mongoose.model('performXdeveloper', DeveloperSchema);

    var api = {
        createApiRequest: createApiRequest,
        getAllAPIRequests: getAllAPIRequests,
        findAPIReqByName: findAPIReqByName
    };
    return api;

    function createApiRequest(apiReq) {
        var deferred = q.defer();

        DeveloperModel.find({reqName: apiReq.reqName}, function (err, doc) {
            if (err) {

            } else {
                if (doc.length == 0) {
                    DeveloperModel.create(apiReq, function (err, doc) {
                        if (err) {
                            console.log("developer.model: createApiRequest - error > " + err);
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            }
        });

        return deferred.promise;
    }

    function findAPIReqByName(name) {
        var deferred = q.defer();

        DeveloperModel.find({reqName: name}, function (err, doc) {
            if (err) {
                console.log("developer.model: findAPIReqByName - error > " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

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