/**
 * Created by ideepakkrishnan on 29-03-2016.
 */

module.exports = function (mongoose) {
    // Declare field schema
    var fieldSchema = mongoose.Schema({
        label: String,
        type: {type: String, enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']},
        placeholder: String,
        options: [{label: String, value: String}]
    }, {collection: 'field'});
    return fieldSchema;
};