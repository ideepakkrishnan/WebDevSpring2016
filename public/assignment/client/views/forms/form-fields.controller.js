/**
 * Created by ideepakkrishnan on 22-02-2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($routeParams, UserService, FieldService, $location) {
        var vm = this;
        var formId = $routeParams.formId;

        function init() {
            if (UserService.getCurrentUser()) {
                var currUser = UserService.getCurrentUser();
                vm.userId = currUser._id;
                vm.username = currUser.username;
                vm.password = currUser.password;
                vm.firstName = currUser.firstName;
                vm.lastName = currUser.lastName;
                vm.userEmail = currUser.email;
            } else {
                $location.path("#/home");
            }

            if(formId) {
                FieldService
                    .getFieldsForForm(formId)
                    .then(function(response){
                        console.log(response);
                        vm.fields = response.data;
                    });
            }
        }
        init();

        function trackFieldEdit(field) {
            vm.currEditField = field;
        }
    }
})();