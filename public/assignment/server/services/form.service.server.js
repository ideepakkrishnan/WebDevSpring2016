/**
 * Created by ideepakkrishnan on 18-03-2016.
 */

module.exports = function(app, formModel) {
    app.post("/api/assignment/user/:userId/form", getAllFormsForUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getAllFormsForUserId(req, res) {
        var userId = req.params.userId;
        // use model to find user by id
        formModel.findAllFormsForUser(userId)
            .then(
                // first retrieve the created user for logging purposes
                function (doc) {
                    console.log(doc);
                    // Now return all the users as a json response
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        // use model to find user by id
        formModel.findFormById(formId)
            .then(
                // first retrieve the created user for logging purposes
                function (doc) {
                    console.log(doc);
                    // Now return all the users as a json response
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        userModel.createFormForUser(userId, form)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function ( err ) {
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
                // first retrieve the user by user id
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(
                function (doc) {
                    console.log(doc);
                    req.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
}