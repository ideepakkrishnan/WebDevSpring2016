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
            if (UserService.getCurrentUser()) {
                vm.addForm = addForm;
                vm.updateForm = updateForm;
                vm.deleteForm = deleteForm;
                vm.selectForm = selectForm;
                vm.loadFormFields = loadFormFields;

                userId = UserService.getCurrentUser()._id;

                FormService
                    .findAllFormsForUser(userId)
                    .then(function(response){
                        console.log(response);
                        vm.myForms = response.data;
                    });
            } else {
                $location.path("#/home");
            }
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