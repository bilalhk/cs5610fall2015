var q = require("q");
var http = require("http");
var attributeGenerator = require("../data_definitions/attributeGenerator");
var Character = require("../data_definitions/character.js");

module.exports = function(appServer, passport, auth, abilities, abilityDescriptions) {
	
	appServer.post("/rest/character", auth, function(req, res) {
		var characterName = req.body.name;
		var options = createOptions(characterName);
		http.request(options, function(response) {
			var rawString = "";
			var characterBioJSON;
			response.on("data", function(chunk) {
				rawString += chunk;
			});
			response.on("end", function() {
				characterBioJSON = JSON.parse(rawString)[0];
				var attributes = attributeGenerator(characterBioJSON);
				var character = new Character(characterBioJSON.name, attributes);
				req.session.character = character;
				res.json(character);
			})
		}).end();
	});
	
	appServer.get("/rest/ability", auth, function(req, res) {
		res.json(abilityDescriptions);
	})
	
	appServer.post("/rest/character/ability", auth, function(req, res) {
		var abilityName = req.body.name;
		var character = req.session.character;
		var ability = abilities.find(function(ability, index, array) {
			return abilityName == ability.name;
		});
		if (ability.verify(character)) {
			character.addAbility(ability);
			res.json(200);
		} else {
			res.json(400);
		}
	})
	
	function createOptions(characterName) {
		var host = "www.myapifilms.com";
		var escapedName = characterName.replace(" ", "%20");
		var path = "/imdb?name="+escapedName+"&format=JSON&filmography=0&limit=1&lang=en-us&exactFilter=0&bornDied=0&starSign=1&uniqueName=0&actorActress=1&actorTrivia=0&actorPhotos=N&actorVideos=N&salary=0&spouses=0&tradeMark=0&personalQuotes=0&starMeter=0";
		var options = {host: host, path: path};
		return options; 
	}
	
}