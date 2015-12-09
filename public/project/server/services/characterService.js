var q = require("q");
var http = require("http");
var attributeGenerator = require("../data_definitions/attributeGenerator");
var Character = require("../data_definitions/character");
var random = require("../util/random");

module.exports = function(appServer, passport, auth, abilities) {
	
	appServer.post("/rest/character", auth, function(req, res) {
		var characterName = req.body.name;
		var options = createOptions(characterName);
		http.request(options, function(response) {
			var rawString = "";
			var name;
			response.on("data", function(chunk) {
				rawString += chunk;
			});
			response.on("end", function() {
				var attributes = {};
				if (rawString == "") {
					attributes = generateRandomAttributes();
					name = "Random";
				} else {
					var characterBioJSON = JSON.parse(rawString)[0];
					attributes = attributeGenerator(characterBioJSON);
					name = characterBioJSON.name;
				}
				var character = new Character(name, attributes);
				character.abilities.push(abilities.find(function(ability, index, array) {
					return ability.name == "Basic Attack";
				}))
				req.session.character = character;
				res.json(character);
			})
		}).end();
	});
	
	appServer.get("/rest/ability", auth, function(req, res) {
		res.json(abilities);
	})
	
	appServer.post("/rest/character/ability", auth, function(req, res) {
		var abilityName = req.body.name;
		var character = req.session.character;
		var abilityIndex = abilities.findIndex(function(ability, index, array) {
			return abilityName == ability.name;
		});
		var ability = abilities[abilityIndex];
		if (character.attributes.wisdom >= ability.wisdomCost) {
			character.abilities.push(ability);
			character.attributes.wisdom = character.attributes.wisdom - ability.wisdomCost;
			var message = "";
			res.json({message: message, character: character});
		} else {
			var message = "Insufficient Wisdom Points";
			res.json({message: message, character: character});
		}
	})
	
	appServer.delete("/rest/character/ability/:name", auth, function(req, res) {
		var name = req.params.name;
		var character = req.session.character;
		var abilityIndex = abilities.findIndex(function(ability, index, array) {
			return name == ability.name;
		});
		if (abilityIndex != -1) {
			var ability = abilities[abilityIndex];
			character.abilities.splice(abilityIndex, 1);
			character.attributes.wisdom = character.attributes.wisdom + ability.wisdomCost;
			res.json(character); 
		} else {
			res.send(400);
		}
	})
	
	function createOptions(characterName) {
		var host = "www.myapifilms.com";
		var escapedName = characterName.replace(" ", "%20");
		var path = "/imdb?name="+escapedName+"&format=JSON&filmography=0&limit=1&lang=en-us&exactFilter=0&bornDied=0&starSign=1&uniqueName=0&actorActress=1&actorTrivia=0&actorPhotos=N&actorVideos=N&salary=0&spouses=0&tradeMark=0&personalQuotes=0&starMeter=0";
		var options = {host: host, path: path};
		return options; 
	}
	
	function generateRandomAttributes() {
		return {
			strength: Math.round(100 - random(10,80)),
			hp: Math.round(100 - random(10,80)),
			wisdom: Math.round(100 - random(10,80)),
			speed: Math.round(100 - random(10,80)),
			defence: Math.round(100 - random(10,80)),
			mana: Math.round(100 - random(10,80))
		};
	}
	
}