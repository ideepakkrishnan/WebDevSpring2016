/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function(app, goalModel) {
    app.post("/api/project/user/goal", createGoal);
    app.get("/api/project/user/goal", getAllGoals);
    app.put("/api/project/user/goal/:id", updateGoalById);
    app.delete("/api/project/user/goal/:id", deleteGoalById);

    function getAllGoals(req, res) {
        var goals = goalModel.findAllGoals();
        res.json(goals);
    }

    function createGoal(req, res) {
        var goal = req.body;
        var goals = goalModel.createGoal(goal);
        res.json(goals);
    }

    function deleteGoalById(req, res) {
        var goalId = req.params.id;
        var result = goalModel.deleteGoalById(goalId);
        res.json(result);
    }

    function updateGoalById(req, res) {
        var goalId = req.params.id;
        var goal = req.body;
        var goals = goalModel.updateGoal(goalId, goal);
        res.json(goals);
    }
};