/**
 * Created by ideepakkrishnan on 17-03-2016.
 */

var mock = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findAllFormFieldsByFormId: findAllFormFieldsByFormId,
        findFormFieldById: findFormFieldById,
        deleteFormFieldById: deleteFormFieldById,
        createFormField: createFormField,
        updateFormFieldById: updateFormFieldById
    };
    return api;

    function createFormForUser(userId, form) {
        var new_form = {
            //"_id": (new Date).getTime(),
            "_id": uuid.v4(),
            "title": form.title,
            "userId": userId,
            "fields": form.fields
        };
        mock.push(new_form);
        return new_form;
    }

    function findAllFormsForUser(userId) {
        var response = [];
        for(var i in mock) {
            if (mock[i].userId == userId) {
                response.push(mock[i]);
            }
        }
        return response;
    }

    function findFormById(formId) {
        var response = null;
        for(var i in mock) {
            if (mock[i]._id == formId) {
                response = mock[i];
                break;
            }
        }
        return response;
    }

    function deleteFormById(formId) {
        for(var i in mock) {
            if (mock[i]._id == formId) {
                mock.splice(i, 1);
                return mock;
            }
        }
    }

    function updateFormById(formId, newForm) {
        for(var i in mock) {
            if (mock[i]._id == formId) {
                mock[i] = newForm;
                return mock[i];
            }
        }
    }

    function findAllFormFieldsByFormId(formId) {
        for(var u in mock) {
            if(mock[u]._id === formId) {
                return mock[u].fields;
            }
        }
        return null;
    }

    function findFormFieldById(formId, fieldId) {
        for(var u in mock) {
            if(mock[u]._id === formId) {
                for(var v in mock[u].fields) {
                    if(mock[u].fields[v]._id == fieldId) {
                        return mock[u].fields[v];
                    }
                }
                break;
            }
        }
        return null;
    }

    function deleteFormFieldById(formId, fieldId) {
        for(var u in mock) {
            if (mock[u]._id == formId) {
                var updatedFields = [];
                for(var v in mock[u].fields) {
                    if(mock[u].fields[v]._id != fieldId) {
                        updatedFields.push(mock[u].fields[v]);
                    }
                }
                mock[u].fields = updatedFields
                return mock[u];
            }
        }
        return null;
    }

    function createFormField(formId, field) {
        // Initialize the new field
        var newField = {
            "_id": uuid.v4(),
            "label": field.label,
            "type": field.type,
            "placeholder": field.placeholder,
            "options": field.options
        }

        // Push the field into form object
        for(var u in mock) {
            if (mock[u]._id == formId) {
                mock[u].fields.push(newField);
                return mock[u];
            }
        }
        return null;
    }

    function updateFormFieldById(formId, fieldId, field) {
        for(var u in mock) {
            if (mock[u]._id == formId) {
                for(var v in mock[u].fields) {
                    if (mock[u].fields[v]._id == fieldId) {
                        mock[u].fields[v].label = field.label;
                        mock[u].fields[v].type = field.type;
                        mock[u].fields[v].placeholder = field.placeholder;
                        return mock[u];
                    }
                }
                break;
            }
        }
        return null;
    }
};