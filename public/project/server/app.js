/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user.model.js")(db, mongoose);
    var goalModel = require("./models/goal.model.js")(db, mongoose, userModel);
    var teamModel = require("./models/team.model.js")(db, mongoose, userModel);
    var developerModel = require("./models/developer.model.js")(db, mongoose);
    var healthLogModel = require("./models/healthLog.model.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var goalService = require("./services/goal.service.server.js")(app, goalModel);
    var teamService = require("./services/team.service.server.js")(app, teamModel);
    var developerService = require("./services/developer.service.server.js")(app, developerModel);
    var healthLogService = require("./services/healthLog.service.server.js")(app, healthLogModel);
}