/**
 * Created by ideepakkrishnan on 24-03-2016.
 */

module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    var goalModel = require("./models/goal.model.js")();
    var teamModel = require("./models/team.model.js")();
    var developerModel = require("./models/developer.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
    var goalService = require("./services/goal.service.server.js")(app, goalModel);
    var teamService = require("./services/team.service.server.js")(app, teamModel);
    var developerService = require("./services/developer.service.server.js")(app, developerModel);
}