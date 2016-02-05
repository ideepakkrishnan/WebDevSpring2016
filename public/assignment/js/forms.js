/**
 * Created by ideepakkrishnan on 24-01-2016.
 */

/*
 * Overloading default tab behaviors:
 * Adding jQuery code to load HTML pages into a Bootstrap tab. The default divs inside forms.html are considered as
 * placeholders and on clicking the fields tab, the corresponding page which  contains the data is loaded
 */

$('#fields').load('form-fields.html');

function loadFormFields(formName) {
    $('#optionTabs a[href="#fields"]').tab('show');
}