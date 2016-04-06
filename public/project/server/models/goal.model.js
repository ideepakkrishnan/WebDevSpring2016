/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

//var mock = require("./goal.mock.json");
var q = require("q");

module.exports = function (db, mongoose) {

    var GoalSchema = require("./goal.schema.server.js")(mongoose);
    var UserSchema = require("./user.schema.server.js")(mongoose);

    var GoalModel = mongoose.model('goal', GoalSchema);
    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findAllGoals: findAllGoals,
        createGoal: createGoal,
        deleteGoalById: deleteGoalById,
        updateGoal: updateGoal
    };
    return api;

    function findAllGoals() {
        return mock;
    }

    function createGoal(goal) {
        var deferred = q.defer();

        GoalModel.create(goal, function (err, doc) {
            if (err) {
                console.log("goal.model: createGoal - error > " + err);
                deferred.reject(err);
            } else {
                console.log("goal.model: createGoal - result > " + doc.data);
                deferred.resolve(doc);
                UserModel.update(
                    {username: doc.username},
                    {$push: {goalIds: doc.data._id}},
                    {upsert: true},
                    function (err, res) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(res);
                        }
                    });
            }
        });

        return deferred.promise;
    }

    function deleteGoalById(goalId) {
        var deferred = q.defer();

        GoalModel.findByIdAndRemove(goalId, function (err, doc) {
            if (err) {
                console.log("goal.model: deleteGoalById - error > " + err);
                deferred.reject(err);
            } else {
                UserModel.findOne({username: doc.data.username}, 'goalIds', function (err, userGoals) {
                    if (err) {
                        console.log("goal.model: deleteGoalById - error > " + err);
                        deferred.reject(err);
                    } else {
                        console.log("goal.model: deleteGoalById - result > " + JSON.stringify(userGoals.data));
                        GoalModel.find({goalId: {$in: userGoals.data}}, function (err, goals) {
                            if (err) {
                                console.log("goal.model: deleteGoalById - error > " + err);
                                deferred.reject(err);
                            } else {
                                deferred.resolve(goals);
                            }
                        });
                    }
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