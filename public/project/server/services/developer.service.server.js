/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

module.exports = function(app, developerModel) {
    app.get("/api/project/api", getAllAPIRequests);

    function getAllAPIRequests(req, res) {
        var apiRequests = developerModel.getAllAPIRequests()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};