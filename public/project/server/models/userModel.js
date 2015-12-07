var userSchema = require("./userSchema.js");

module.exports = function(mongoose) {
	
	var schema = userSchema(mongoose);
	var model = mongoose.model("UserModel", schema);
	
	return model;
}