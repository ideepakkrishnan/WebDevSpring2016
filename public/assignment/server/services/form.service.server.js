/**
 * Created by ideepakkrishnan on 18-03-2016.
 */

module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getAllFormsForUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getAllFormsForUserId(req, res) {
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormById(req, res) {
        var formId = req.params.formId;

        // use model to find user by id
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createFormForUser(userId, form)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;

        // use model to find user by id
        formModel.updateFormById(formId, form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}