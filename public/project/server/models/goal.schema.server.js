/**
 * Created by ideepakkrishnan on 05-04-2016.
 */

module.exports = function (mongoose) {
    var goalSchema = mongoose.Schema({
        username: String,
        type: [String],
        calories: Number,
        weight: Number,
        fat: Number,
        steps: Number,
        distance: Number,
        duration: Number,
        floors: Number,
        date: Date
    }, {collection: 'goal'});
};