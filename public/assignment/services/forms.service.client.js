/**
 * Created by ideepakkrishnan on 01-03-2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService() {

        // Expose the functionalities of the API through this variable
        var api = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form, callback) {
            var new_form = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId
            };
            api.forms.push(new_form);
            callback(new_form);
        }

        function findAllFormsForUser(userId, callback) {
            var response = [];
            for (var i=0; i<api.forms.length; i++) {
                var curr_form = api.forms[i];
                if (curr_form.userId == userId) {
                    response.push(curr_form);
                }
            }
            callback(response);
        }

        function filterForms(form, formId) {
            return form._id != formId;
        }

        function deleteFormById(formId, callback) {
            api.forms = api.forms.filter(filterForms, formId);
            callback(api.forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i=0; i<api.forms.length; i++) {
                var curr_form = api.forms[i];
                if (curr_form._id == formId) {
                    curr_form = newForm;
                    callback(curr_form);
                }
            }
        }
    }
})();