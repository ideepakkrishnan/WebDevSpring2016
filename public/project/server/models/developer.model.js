/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

var mock = require("./developer.mock.json");

module.exports = function () {
    var api = {
        getAllAPIRequests: getAllAPIRequests
    };
    return api;

    function getAllAPIRequests() {
        return mock;
    }
};