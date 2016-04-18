/**
 * Created by ideepakkrishnan on 17-04-2016.
 */

var q = require("q");

module.exports = function (db, mongoose, userModel) {

    var HealthLogSchema = require("./healthLog.schema.server.js")(mongoose);

    var HealthLogModel = mongoose.model('performXhealthLog', HealthLogSchema);

    var api = {
        findAllHealthLogs: findAllHealthLogs,
        findHealthLogsForUser: findHealthLogsForUser,
        createHealthLog: createHealthLog,
        deleteHealthLogById: deleteHealthLogById,
        updateHealthLogById: updateHealthLogById
    };
    return api;

    function findAllHealthLogs() {
        var deferred = q.defer();

        HealthLogModel.find({}, function (err, doc) {
            if (err) {
                console.log("healthLog.model: findAllHealthLogs - error > " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findHealthLogsForUser(username) {
        var deferred = q.defer();

        HealthLogModel.find({username: username}, function (err, doc) {
            if (err) {
                console.log("healthLog.model: findAllHealthLogs - error > " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createHealthLog(healthData) {
        var deferred = q.defer();

        HealthLogModel.remove(
            {username: healthData.username, type: healthData.type}, function (err, doc) {
                if (err) {
                    console.log("healthLog.model: createHealthLog - error > " + err.message);
                    deferred.reject(err);
                } else {
                    HealthLogModel.create(healthData, function (err, doc) {
                        if (err) {
                            console.log("healthLog.model: createHealthLog - error > " + err.message);
                            deferred.reject(err);
                        } else {
                            console.log("healthLog.model: createHealthLog - result > " + JSON.stringify(doc));
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function deleteHealthLogById(healthLogId) {
        var deferred = q.defer();

        HealthLogModel.findByIdAndRemove(healthLogId, function (err, res) {
            if (err) {
                console.log("healthLog.model: deleteHealthLogById - error > " + err);
                deferred.reject(err);
            } else {
                HealthLogModel.find({}, function (err, doc) {
                    if (err) {
                        console.log("healthLog.model: deleteHealthLogById - error > " + err.message);
                        deferred.reject(err);
                    } else {
                        console.log("healthLog.model: deleteHealthLogById - result > " + JSON.stringify(doc));
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateHealthLogById(healthLogId, healthLog) {
        var deferred = q.defer();

        HealthLogModel.findByIdAndUpdate(
            healthLogId,
            {$set: healthLog},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("healthLog.model: updateHealthLogById - error > " + err.message);
                    deferred.reject(err);
                } else {
                    console.log("healthLog.model: updateHealthLogById - result > " + JSON.stringify(doc));
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
};