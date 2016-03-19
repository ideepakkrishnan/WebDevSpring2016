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
        var formFieldList = formModel.findAllFormFieldsByFormId(formId);
        res.json(formFieldList);
    }

    function getFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var formField = formModel.findFormFieldById(formId, fieldId);
        res.json(formField);
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var formFieldList = formModel.deleteFormFieldById(formId, fieldId);
        res.json(formFieldList);
    }

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var updatedForm = formModel.createFormField(formId, field);
        res.json(updatedForm);
    }

    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        // use model to find user by id
        var formFields = formModel.updateFormFieldById(formId, fieldId, field);
        res.json(formFields);
    }

    function getAllFieldTypes(req, res) {
        var fieldTypes = formModel.getAllFieldTypes();
        res.json(fieldTypes);
    }
};