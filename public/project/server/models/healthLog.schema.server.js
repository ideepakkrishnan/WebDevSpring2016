/**
 * Created by ideepakkrishnan on 17-04-2016.
 */

module.exports = function (mongoose) {
    var healthLogSchema = mongoose.Schema({
        username: String,
        type: String,
        healthdata: [Object],
        date: Date
    }, {collection: 'performXhealthLog'});
    return healthLogSchema;
};