/**
 * Created by ideepakkrishnan on 18-03-2016.
 */

module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getAllFormFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignment/form/:formId/field", cloneFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);

    function getAllFormFieldsByFormId(req, res) {
        var formId = req.params.formId;
        formModel.findAllFormFieldsByFormId(formId)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFormFieldById(formId, fieldId)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFormFieldById(formId, fieldId)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function cloneFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel.createFormField(formId, field)
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

    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        // use model to find user by id
        formModel.updateFormFieldById(formId, fieldId, field)
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
};