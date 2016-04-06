/**
 * Created by ideepakkrishnan on 05-04-2016.
 */

module.exports = function (mongoose) {
    var teamSchema = mongoose.Schema({
        name: String,
        description: String,
        image: String,
        users: [String]
    }, {collection: 'team'});
};