/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function(app, goalModel) {
    app.post("/api/project/user/goal", createGoal);
    app.get("/api/project/user/:username/goal", getAllGoalsForUsername);
    app.get("/api/project/user/:username/goal/watch", getAllGoalsAssignedByUsername);
    app.get("/api/project/user/:assignedTo/goal/watcher/:assignedBy", getAllGoalsAssignedToUserByWatcher);
    app.get("/api/project/user/goal", getAllGoals);
    app.put("/api/project/user/goal/:id", updateGoalById);
    app.delete("/api/project/user/goal/:id", deleteGoalById);

    function getAllGoals(req, res) {
        var goals = goalModel.findAllGoals()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllGoalsForUsername(req, res) {
        var username = req.params.username;
        goalModel
            .findGoalsAssignedByUser(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllGoalsAssignedByUsername(req, res) {
        var username = req.params.username;
        goalModel
            .findGoalsAssignedByUser(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllGoalsAssignedToUserByWatcher(req, res) {
        var assignedToUser = req.params.assignedTo;
        var assignedByUser = req.params.assignedBy;
        
        goalModel
            .findGoalsAssignedToUserByWatcher(assignedToUser, assignedByUser)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createGoal(req, res) {
        var goal = req.body;
        var goals = goalModel.createGoal(goal)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteGoalById(req, res) {
        var goalId = req.params.id;
        var result = goalModel.deleteGoalById(goalId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateGoalById(req, res) {
        var goalId = req.params.id;
        var goal = req.body;
        var goals = goalModel.updateGoal(goalId, goal)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};