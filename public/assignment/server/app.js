var userService = require("./services/user.service.js");
var formService = require("./services/form.service.js");
var fieldService = require("./services/field.service.js");
var usersModel = require("./models/user.model.js")();
var formsModel = require("./models/form.model.js")();

module.exports = function(appServer) {
	
	// initialize services
	userService(appServer, usersModel);
	formService(appServer, formsModel);
	fieldService(appServer, formsModel);
}