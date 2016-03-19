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

                vm.trackFieldEdit = trackFieldEdit;
                vm.clearEditTracking = clearEditTracking;
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
            clearEditTracking();
            vm.currEditField = field;
            vm.currEditFieldLabel = field.label;
            if (!field.options) {
                vm.currEditFieldPlaceholder = field.placeholder;
            }
            if (field.options) {
                var txt = "";
                for (var u in field.options) {
                    txt += (field.options[u].label + ":" + field.options[u].value + "\n");
                }
                vm.currEditFieldOptions = txt;
                console.log(txt);
            }
        }

        function clearEditTracking() {
            vm.currEditField = null;
            vm.currEditFieldLabel = null;
            vm.currEditFieldPlaceholder = null;
            vm.currEditFieldOptions = null;
        }
    }
})();