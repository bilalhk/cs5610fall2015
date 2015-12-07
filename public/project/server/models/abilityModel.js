var abilitySchema = require("./abilitySchema");

module.exports = function(mongoose) {
	
	var schema = abilitySchema(mongoose);
	var model = mongoose.model("AbilityModel", schema);
	
	return model;
	
}