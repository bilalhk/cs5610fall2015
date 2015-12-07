module.exports = function(mongoose) {
	
	var schema = mongoose.Schema({
		name: String,
		wisdomCost: Number,
		description: String,
		visit: String,
	},
	{collection: "ability"});
	
	return schema;
	
}