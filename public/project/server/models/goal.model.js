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

    function createGoal(goal) {
        var deferred = q.defer();

        GoalModel.create(goal, function (err, doc) {
            if (err) {
                console.log("goal.model: createGoal - error > " + err);
                deferred.reject(err);
            } else {
                console.log("goal.model: createGoal - result > " + doc.data);
                userModel.addPersonalGoal(doc.username, doc.data._id).then(
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
                userModel.removePersonalGoal(res.data.username, goalId)
                    .then(
                        function (doc) {
                            console.log("goal.model: deleteGoalById - result > " + JSON.stringify(doc.data));
                            GoalModel.find({goalId: {$in: doc.data.goalIds}}, function (err, goals) {
                                if (err) {
                                    console.log("goal.model: deleteGoalById - error > " + err);
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(goals);
                                }
                            });
                        },
                        function (err) {
                            console.log("goal.model: deleteGoalById - error > " + err);
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
            {$set: {
                username: goal.username,
                calories: goal.calories,
                weight: goal.weight,
                fat: goal.fat,
                steps: goal.steps,
                distance: goal.distance,
                duration: goal.duration,
                floors: goal.floors,
                date: goal.date,
                type: goal.type
            }},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("goal.model: updateGoal - error > " + err);
                    deferred.reject(err);
                } else {
                    console.log("goal.model: updateGoal - result > " + err);
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
};