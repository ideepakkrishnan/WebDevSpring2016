/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($location, FormService, UserService) {
        var vm = this;
        var userId = null;

        function init() {
            vm.addForm = addForm;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;
            vm.selectForm = selectForm;
            vm.loadFormFields = loadFormFields;

            UserService
                .getCurrentUser()
                .then(
                    function (currUser) {
                        userId = currUser.data._id;
                        FormService
                            .findAllFormsForUser(userId)
                            .then(function(response){
                                console.log(response);
                                vm.myForms = response.data;
                            });
                    },
                    function (err) {
                        console.log("form.controller - init error: " + err.message);
                    }
                );
        }

        init();

        function addForm(formName) {
            FormService
                .createFormForUser(
                    userId,
                    {title: formName}
                )
                .then(function(response) {
                    console.log(response);
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response){
                            console.log(response);
                            vm.formName = "";
                            vm.myForms = response.data;
                        });
                });
        }

        function updateForm() {
            vm.newForm.title = vm.formName;
            FormService
                .updateFormById(
                    vm.newForm._id,
                    vm.newForm
                )
                .then(function(response){
                    vm.formName = "";
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response){
                            console.log(response);
                            vm.myForms = response.data;
                            vm.newForm = null;
                        });
                });
        }

        function deleteForm(formId) {
            FormService
                .deleteFormById(formId)
                .then(function(response) {
                    console.log(response);
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response){
                            console.log(response);
                            vm.myForms = response.data;
                        });
                });
        }

        function selectForm(form) {
            vm.formName = form.title;
            vm.newForm = form;
        }

        function loadFormFields(formId) {
            $location.url("/fields/"+formId);
        }
    }
})();