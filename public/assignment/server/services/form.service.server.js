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
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        // use model to find user by id
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var newForm = userModel.createFormForUser(userId, form);
        res.json(newForm);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;

        // use model to find user by id
        var updatedForm = formModel.updateFormById(formId, form);
        res.json(updatedForm);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var updatedList = formModel.deleteFormById(formId);
        res.json(updatedList);
    }
}