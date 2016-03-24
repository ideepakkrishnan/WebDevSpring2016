/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

var mock = require("./goal.mock.json");

module.exports = function () {
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
        var newGoal = {
            "_id": (new Date).getTime(),
            "username": goal.username,
            "calories": goal.calories,
            "weight": goal.weight,
            "fat": goal.fat,
            "steps": goal.steps,
            "distance": goal.distance,
            "duration": goal.duration,
            "floors": goal.floors,
            "date": goal.date,
            "type": goal.type
        };

        mock.push(newGoal);
        return mock;
    }

    function deleteGoalById(goalId) {
        var response = [];
        for (var i=0; i<mock.length; i++) {
            if (mock[i]._id != goalId) {
                response.push(mock[i]);
            }
        }
        mock = response;
        return mock;
    }

    function updateGoal(goalId, goal) {
        for (var i=0; i<mock.length; i++) {
            if (mock[i]._id == goalId) {
                mock[i].username = goal.username;
                mock[i].calories = goal.calories;
                mock[i].weight = goal.weight;
                mock[i].fat = goal.fat;
                mock[i].steps = goal.steps;
                mock[i].distance = goal.distance;
                mock[i].duration = goal.duration;
                mock[i].floors = goal.floors;
                mock[i].date = goal.date;
                mock[i].type = goal.type;
                return mock;
            }
        }
    }
};