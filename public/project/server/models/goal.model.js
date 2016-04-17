/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

//var mock = require("./goal.mock.json");
var q = require("q");

module.exports = function (db, mongoose, userModel) {

    var GoalSchema = require("./goal.schema.server.js")(mongoose);

    var GoalModel = mongoose.model('performXgoal', GoalSchema);

    var api = {
        findAllGoals: findAllGoals,
        findGoalsForUser: findGoalsForUser,
        findGoalsAssignedByUser: findGoalsAssignedByUser,
        findGoalsAssignedToUserByWatcher: findGoalsAssignedToUserByWatcher,
        createGoal: createGoal,
        deleteGoalById: deleteGoalById,
        updateGoal: updateGoal
    };
    return api;

    function findAllGoals() {
        var deferred = q.defer();

        GoalModel.find({}, function (err, doc) {
            if (err) {
                console.log("goal.model: findAllGoals - error > " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findGoalsForUser(username) {
        var deferred = q.defer();

        GoalModel.find({username: username}, function (err, doc) {
            if (err) {
                console.log("goal.model: findGoalsForUser - error > " + err);
                deferred.reject(err);
            } else {
                console.log("goal.model: findGoalsForUser - result > " + doc.data);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findGoalsAssignedByUser(username) {
        var deferred = q.defer();

        GoalModel.find({assignedBy: username}, function (err, doc) {
            if (err) {
                console.log("goal.model: findGoalsAssignedByUser - error > " + err);
                deferred.reject(err);
            } else {
                console.log("goal.model: findGoalsAssignedByUser - result > " + doc.data);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findGoalsAssignedToUserByWatcher(assignedTo, assignedBy) {
        var deferred = q.defer();

        GoalModel.find({username: assignedTo, assignedBy: assignedBy}, function (err, doc) {
            if (err) {
                console.log("goal.model: findGoalsAssignedToUserByWatcher - error > " + err);
                deferred.reject(err);
            } else {
                console.log("goal.model: findGoalsAssignedToUserByWatcher - result > " + doc.data);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createGoal(goal) {
        var deferred = q.defer();

        GoalModel.create(goal, function (err, doc) {
            if (err) {
                console.log("goal.model: createGoal - error > " + err.message);
                deferred.reject(err);
            } else {
                console.log("goal.model: createGoal - result > " + JSON.stringify(doc));
                userModel.addPersonalGoal(doc.username, doc._id).then(
                    function (res) {
                        deferred.resolve(res);
                    },
                    function (err) {
                        deferred.reject(err);
                    }
                );
            }
        });

        return deferred.promise;
    }

    function deleteGoalById(goalId) {
        var deferred = q.defer();

        GoalModel.findByIdAndRemove(goalId, function (err, res) {
            if (err) {
                console.log("goal.model: deleteGoalById - error > " + err);
                deferred.reject(err);
            } else {
                userModel.removePersonalGoal(res.username, goalId)
                    .then(
                        function (doc) {
                            console.log("goal.model: deleteGoalById - result > " + JSON.stringify(doc));
                            deferred.resolve(doc);
                        },
                        function (err) {
                            console.log("goal.model: deleteGoalById - error > " + err.message);
                            deferred.reject(err);
                        });
            }
        });

        return deferred.promise;
    }

    function updateGoal(goalId, goal) {
        var deferred = q.defer();

        GoalModel.findByIdAndUpdate(
            goalId,
            {$set: goal},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("goal.model: updateGoal - error > " + err.message);
                    deferred.reject(err);
                } else {
                    console.log("goal.model: updateGoal - result > " + JSON.stringify(doc));
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
};