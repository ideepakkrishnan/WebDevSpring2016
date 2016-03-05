/**
 * Created by ideepakkrishnan on 01-03-2016.
 */

(function () {
    "use strict";

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
                if (api.forms[i].userId == userId) {
                    response.push(api.forms[i]);
                }
            }
            callback(response);
        }

        function deleteFormById(formId, callback) {
            for (var i=0; i<api.forms.length; i++) {
                if (api.forms[i]._id == formId) {
                    api.forms.splice(i, 1);
                    callback(api.forms);
                }
            }
        }

        function updateFormById(formId, newForm, callback) {
            for (var i=0; i<api.forms.length; i++) {
                if (api.forms[i]._id == formId) {
                    api.forms[i] = newForm;
                    callback(api.forms[i]);
                }
            }
        }
    }
})();