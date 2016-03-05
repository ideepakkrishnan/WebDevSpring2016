/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, $rootScope, $location, FormService) {

        if ($rootScope.currentUser) {
            $scope.addForm = addForm;
            $scope.updateForm = updateForm;
            $scope.deleteForm = deleteForm;
            $scope.selectForm = selectForm;

            var userId = $rootScope.currentUser._id;

            FormService.findAllFormsForUser(
                userId,
                function(response){
                    console.log(response);
                    $scope.myForms = response;
                }
            )
        } else {
            $location.path("#/home");
        }

        function addForm(formName) {
            FormService.createFormForUser(
                userId,
                {title: formName},
                function(response) {
                    console.log(response);
                    FormService.findAllFormsForUser(
                        userId,
                        function(response){
                            console.log(response);
                            $scope.formName = "";
                            $scope.myForms = response;
                        }
                    )
                }
            )
        }

        function updateForm() {
            $scope.newForm.title = $scope.formName;
            FormService.updateFormById(
                $scope.newForm._id,
                $scope.newForm,
                function(response){
                    console.log(response);
                    $scope.formName = "";
                    FormService.findAllFormsForUser(
                        userId,
                        function(response){
                            console.log(response);
                            $scope.myForms = response;
                            $scope.newForm = null;
                        }
                    )
                }
            )
        }

        function deleteForm(formId) {
            FormService.deleteFormById(
                formId,
                function(response) {
                    console.log(response);
                    FormService.findAllFormsForUser(
                        userId,
                        function(response){
                            console.log(response);
                            $scope.myForms = response;
                        }
                    )
                }
            )
        }

        function selectForm(form) {
            $scope.formName = form.title;
            $scope.newForm = form;
        }
    }
})();