/**
 * Created by ideepakkrishnan on 18-03-2016.
 */

module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getAllFormFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.get("/api/assignment/form/fieldTypes", getAllFieldTypes);

    function getAllFormFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var formFieldList = formModel.findAllFormFieldsByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var formField = formModel.findFormFieldById(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var formFieldList = formModel.deleteFormFieldById(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var updatedForm = formModel.createFormField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        // use model to find user by id
        var formFields = formModel.updateFormFieldById(formId, fieldId, field)
            .then(
                function (doc) {
                    console.log("server service updated field: " + doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllFieldTypes(req, res) {
        var fieldTypes = formModel.getAllFieldTypes()
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