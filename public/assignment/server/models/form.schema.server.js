/**
 * Created by ideepakkrishnan on 29-03-2016.
 */

module.exports = function (mongoose) {

    var fieldSchema = require('./field.schema.server.js')(mongoose);

    // Declare form schema
    var formSchema = mongoose.Schema({
        title: String,
        userId: String,
        fields: [fieldSchema]
    }, {collection: 'form'});
    return formSchema;
};