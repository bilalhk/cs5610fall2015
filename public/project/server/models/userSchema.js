module.exports = function(mongoose) {
	
	var schema = new mongoose.Schema({
		username: String,
		password: String,
		firstName: String,
		lastName: String,
		email: String,
		wins: Number,
		losses: Number,
		roles: {
			type: [String],
			default: ["client"]
		}
	},
	{collection: "user"});
	
	return schema;
}