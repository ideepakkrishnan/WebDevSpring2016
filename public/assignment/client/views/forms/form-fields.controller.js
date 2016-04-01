/**
 * Created by ideepakkrishnan on 22-02-2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($routeParams, UserService, FieldService, FormService, $location) {
        var vm = this;
        var formId = $routeParams.formId;
        var currForm = null;

        function init() {
            if (UserService.getCurrentUser()) {
                var currUser = UserService.getCurrentUser();
                vm.userId = currUser._id;
                vm.username = currUser.username;
                vm.password = currUser.password;
                vm.firstName = currUser.firstName;
                vm.lastName = currUser.lastName;
                vm.userEmail = currUser.email;

                vm.trackFieldEdit = trackFieldEdit;
                vm.clearEditTracking = clearEditTracking;
                vm.addField = addField;
                vm.deleteField = deleteField;
                vm.updateEditField = updateEditField;
                vm.cloneField = cloneField;

                vm.sortingOptions = {
                    handle: '.reorderHandle',
                    stop: updateFieldSorting
                }
            } else {
                $location.path("#/home");
            }

            if(formId) {
                FieldService
                    .getFieldsForForm(formId)
                    .then(function(response){
                        currForm = response.data;
                        vm.fields = response.data.fields;
                    });
            }
        }
        init();

        function trackFieldEdit(field) {
            clearEditTracking();
            vm.currEditField = field;
            vm.currEditFieldLabel = field.label;
            if (field.type == 'TEXT' || field.type == 'TEXTAREA' || field.type == 'EMAIL' || field.type == 'PASSWORD') {
                vm.currEditFieldPlaceholder = field.placeholder;
            }
            if (field.options) {
                var txt = "";
                for (var u in field.options) {
                    txt += (field.options[u].label + ":" + field.options[u].value + "\n");
                }
                vm.currEditFieldOptions = txt;
            }
        }

        function updateEditField() {
            var updatedOptions = [];
            if (vm.currEditField.options) {
                var updatedValues = vm.currEditFieldOptions.split('\n');
                var newOption = [];
                for (var i=0; i<updatedValues.length; i++) {
                    newOption = updatedValues[i].split(':');
                    updatedOptions.push({label: newOption[0], value: newOption[1]})
                }
            }

            FieldService.updateField(
                formId,
                vm.currEditField._id,
                {
                    label: vm.currEditFieldLabel,
                    placeholder: vm.currEditFieldPlaceholder,
                    options: updatedOptions,
                    type: vm.currEditField.type
                }
            ).then(function (response) {
                vm.fields = response.data.fields;
            });
        }

        function clearEditTracking() {
            vm.currEditField = null;
            vm.currEditFieldLabel = null;
            vm.currEditFieldPlaceholder = null;
            vm.currEditFieldOptions = null;
        }

        function addField(fieldType) {
            var newField = {}
            if (fieldType == "TEXT") {
                newField._id = null;
                newField.label = "New Text Field";
                newField.type = "TEXT";
                newField.placeholder = "New Field";
                newField.options = [];
            } else if (fieldType == "TEXTAREA") {
                newField._id = null;
                newField.label = "New Text Field";
                newField.type = "TEXTAREA";
                newField.placeholder = "New Field";
                newField.options = [];
            } else if (fieldType == "DATE") {
                newField._id = null;
                newField.label = "New Date Field";
                newField.type = "DATE";
                newField.options = [];
            } else if (fieldType == "OPTIONS") {
                newField._id = null;
                newField.label = "New Dropdown";
                newField.type = "OPTIONS";
                newField.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
            } else if (fieldType == "CHECKBOXES") {
                newField._id = null;
                newField.label = "New Checkboxes";
                newField.type = "CHECKBOXES";
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            } else if (fieldType == "RADIOS") {
                newField._id = null;
                newField.label = "New Radio Buttons";
                newField.type = "RADIOS";
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            } else {
                // do nothing
            }

            FieldService
                .createFieldForForm(formId, newField)
                .then(function(response){
                    vm.fields = response.data.fields;
                });
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function (response) {
                    vm.fields = response.data.fields;
                });
        }

        function cloneField(field) {
            var newField = {
                label: field.label,
                type: field.type,
                placeholder: field.placeholder,
                options: (field.options? field.options: [])
            };

            FieldService
                .createFieldForForm(formId, newField)
                .then(function(response){
                    vm.fields = response.data.fields;
                });
        }

        function updateFieldSorting(e, ui) {
            var updatedForm = {
                _id: formId,
                title: currForm.title,
                userId: currForm.userId,
                fields: vm.fields
            };

            FormService
                .updateFormById(
                    formId,
                    updatedForm
                )
                .then(function(response){
                    console.log(response);
                    vm.formName = "";
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function(response){
                            currForm = response.data;
                            vm.fields = response.data.fields;
                        });
                });
        }
    }
})();