/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

module.exports = function(app, developerModel) {
    app.get("/api/project/api", getAllAPIRequests);
    app.put("/api/project/api", generateContent);

    function getAllAPIRequests(req, res) {
        developerModel.getAllAPIRequests()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function generateContent(req, res) {
        var reqs = [
            {"reqName": "activityData", "templateUrl": "https://api.fitbit.com/1/user/[user-id]/activities/date/[date].json", "sample": "https://api.fitbitcom/1/user/XXXXXX/activities/date/2016-03-25.json", "options": "[date]: yyyy-MM-dd, [user-id]: Encoded ID of the user"},
            {"reqName": "profileData", "templateUrl": "https://api.fitbit.com/1/user/[user-id]/profile.json", "sample": "https://api.fitbit.com/1/user/XXXXXX/profile.json", "options": "[user-id]: Encoded ID of the user"},
            {"reqName": "userDevices", "templateUrl": "https://api.fitbit.com/1/user/[user-id]/devices.json", "sample": "https://api.fitbit.com/1/user/XXXXXX/devices.json", "options": "[user-id]: Encoded ID of the user"},
            {"reqName": "friends", "templateUrl": "https://api.fitbit.com/1/user/[user-id]/friends.json", "sample": "https://api.fitbit.com/1/user/XXXXXX/friends.json", "options": "[user-id]: Encoded ID of the user"},
            {"reqName": "heartRate", "templateUrl": "https://api.fitbit.com/1/user/[user-id]/activities/heart/date/[date]/[period].json", "sample": "https://api.fitbit.com/1/user/XXXXXX/activities/heart/date/2016-03-25/1d.json", "options": "[user-id]: Encoded ID of the user, [date]: yyyy-MM-dd, [period]: 1d | 7d | 30d | 1w | 1m"},
            {"reqName": "sleepLog", "templateUrl": "https://api.fitbit.com/1/user/[user-id]/sleep/date/[date].json", "sample": "https://api.fitbit.com/1/user/XXXXXX/sleep/date/2016-03-25.json", "options": "[user-id]: Encoded ID of the user"}
            ];

        for (var i = 0; i<reqs.length; i++) {
            developerModel
                .createApiRequest(reqs[i])
                .then(
                    function (doc) {

                    },
                    function (err) {

                    }
                );
        }

        res.json({res: 1});
    }
};