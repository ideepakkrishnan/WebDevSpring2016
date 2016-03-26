/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

module.exports = function(app, apiModel) {
    app.get("/api/project/api", getAllAPIRequests);

    function getAllAPIRequests(req, res) {
        var apiRequests = apiModel.getAllAPIRequests();
        res.json(apiRequests);
    }
};