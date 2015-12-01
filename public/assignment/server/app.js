var userService = require("./services/user.service.js");
var formService = require("./services/form.service.js");
var fieldService = require("./services/field.service.js");
var userModel = require("./models/user.model.js");
var formsModel = require("./models/form.model.js");

module.exports = function(appServer, mongoose) {
	
	// initialize models
	var UserModel = userModel(mongoose);
	var FormModel = formsModel(mongoose);
	
	// initialize services
	userService(appServer, UserModel);
	formService(appServer, FormModel);
	fieldService(appServer, FormModel);
}