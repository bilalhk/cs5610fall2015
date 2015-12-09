module.exports = function(appServer, authClient, authAdmin, abilities, AbilityModel) {
	
	appServer.get("/rest/ability", authClient, function(req, res) {
		res.json(abilities);
	})
	
	appServer.post("/rest/ability", authAdmin, function(req, res) {
		var ability = req.body;
		AbilityModel.create(ability).then(function(ability) {
			res.send(200);
		})
	})
	
}