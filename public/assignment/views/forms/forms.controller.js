/**
 * Created by ideepakkrishnan on 22-02-2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, $rootScope, FormService) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        if ($rootScope.currentUser) {
            var userId = $rootScope.currentUser.userId;
        }

        function addForm(formName) {
            FormService.createFormForUser(
                userId,
                {title: formName},
                function(response) {
                    console.log(response);
                }
            )
        }

        function updateForm(formId) {
            console.log("Updating form: " + formId);
        }

        function deleteForm(formId) {
            FormService.deleteFormById(
                formId,
                function(response) {
                    console.log(response);
                }
            )
        }

        function selectForm(formID) {

        }
    }
})();