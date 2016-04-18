/**
 * Created by ideepakkrishnan on 18-04-2016.
 */

module.exports = function (mongoose) {
    var genericLogSchema = mongoose.Schema({
        dateTime: Date,
        value: Number
    }, {collection: 'performXgenericLog'});
    return genericLogSchema;
};