module.exports = function(mongoose) {
	
	var schema = new mongoose.Schema({
		username: String,
		password: String,
		firstName: String,
		lastName: String,
		email: String,
		roles: {
			type: [String],
			default: ["client"]
		}
	},
	{collection: "user"});
	
	return schema;
}