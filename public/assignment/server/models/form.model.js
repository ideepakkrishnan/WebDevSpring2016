/**
 * Created by ideepakkrishnan on 17-03-2016.
 */

//var mock = require("./form.mock.json");
//var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormModel = mongoose.model('form', FormSchema);
    var FieldModel = mongoose.model('field', FieldSchema);

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
        //TODO: Create form fields using fields model before adding it to the form
        var new_form = {
            //"_id": (new Date).getTime(),
            //"_id": uuid.v4(),
            "title": form.title,
            "userId": userId,
            "fields": form.fields
        };

        var deferred = q.defer();

        FormModel.create(new_form, function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();

        FormModel.find({userId: userId}, function (err, doc) {
            console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        FormModel.findByIdAndRemove(formId, function (err, doc) {
            console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                FormModel.find({}, function (err, doc) {
                    console.log(doc);

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();

        console.log("Updates to be saved: " + JSON.stringify(newForm));

        delete newForm._id;

        FormModel.findByIdAndUpdate(formId, newForm, {new: true}, function (err, doc) {
            if (err) {
                console.log("Form update error: " + err);
                deferred.reject(err);
            } else {
                console.log("Updated form: " + JSON.stringify(doc.data));
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllFormFieldsByFormId(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, 'fields', function (err, doc) {
            console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormFieldById(formId, fieldId) {
        var deferred = q.defer();

        FieldModel.findById(fieldId, function (err, doc) {
            console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormFieldById(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findByIdAndUpdate(
            formId,
            {$pull: {'fields': {_id: fieldId}}},
            {new: true},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
        });
        return deferred.promise;
    }

    function createFormField(formId, field) {
        // Initialize the new field
        var newField = {
            //"_id": uuid.v4(),
            "label": field.label,
            "type": field.type,
            "placeholder": field.placeholder,
            "options": field.options
        }

        var deferred = q.defer();

        FieldModel.create(newField, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                FormModel.findById(formId, function (err, currForm) {
                    if (err) {
                        deferred.reject(err);
                    }

                    if (currForm) {
                        currForm.fields.push(doc);
                        currForm.save(function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateFormFieldById(formId, fieldId, field) {
        var deferred = q.defer();

        FormModel.update({'fields._id': fieldId},
            {$set: {
                'fields.$.label': field.label,
                'fields.$.placeholder': field.placeholder,
                'fields.$.options': (field.options? field.options: [])
            }},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FormModel.findById(formId, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
        });
        return deferred.promise;
    }
};