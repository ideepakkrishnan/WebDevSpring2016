/**
 * Created by ideepakkrishnan on 05-04-2016.
 */

modules.exports = function (mongoose) {
    var developerSchema = mongoose.Schema({
        reqName: String,
        templateUrl: String,
        sample: String,
        options: String
    }, {collection: 'developer'});
};