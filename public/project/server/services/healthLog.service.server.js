/**
 * Created by ideepakkrishnan on 18-04-2016.
 */

module.exports = function(app, healthLogModel) {
    app.post("/api/project/healthLog", createHealthLog);
    app.get("/api/project/healthLog/user/:username", getHealthLogsForUser);
    app.get("/api/project/healthLog/user/:username/:type/:index", getSpecificHealthLogsForUser);
    app.get("/api/project/healthLog", getAllHealthLogs);
    app.put("/api/project/healthLog/:id", updateHealthLogById);
    app.delete("/api/project/healthLog/:id", deleteHealthLogById);

    function createHealthLog(req, res) {
        var healthData = req.body;
        healthLogModel
            .createHealthLog(healthData)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getHealthLogsForUser(req, res) {
        var username = req.params.username;
        healthLogModel
            .findHealthLogsForUser(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getSpecificHealthLogsForUser(req, res) {
        var username = req.params.username;
        var type = req.params.type;
        var index = req.params.index;
        healthLogModel
            .findSpecificHealthLogsForUser(username, type)
            .then(
                function (doc) {
                    var result = {
                        resForIndex: index,
                        res: doc
                    };
                    res.json(result);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllHealthLogs(req, res) {
        healthLogModel
            .findAllHealthLogs()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateHealthLogById(req, res) {
        var healthLogId = req.params.id;
        var healthData = req.body;
        healthLogModel
            .updateHealthLogById(healthLogId, healthData)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteHealthLogById(req, res) {
        var healthLogId = req.params.id;
        healthLogModel
            .deleteHealthLogById(healthLogId)
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