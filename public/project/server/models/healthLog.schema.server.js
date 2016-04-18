/**
 * Created by ideepakkrishnan on 17-04-2016.
 */

module.exports = function (mongoose) {

    var GenericLogSchema = require("./genericLog.schema.server.js")(mongoose);

    var healthLogSchema = mongoose.Schema({
        username: String,
        type: String,
        healthdata: [GenericLogSchema],
        date: Date
    }, {collection: 'performXhealthLog'});
    return healthLogSchema;
};