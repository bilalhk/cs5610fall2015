var Player = require("../data_definitions/player");
var World = require("../data_definitions/world");
var FrontEndWorld = require("../data_definitions/frontEndWorld");
var strEq = require("../util/stringEquality");

module.exports = function(appServer, authClient, playerQueue, playerSet, activeDuels, abilities, UserModel) {
	
	appServer.post("/rest/duel", authClient, function(req, res) {
		if (playerSet[req.user._id]) {
			res.send(400);
		} else {
			var player = new Player(req.session.character, req.user);
			playerQueue.push(player);
			playerSet[req.user._id] = true;
			res.send(200);
		}
	})
	
	appServer.get("/rest/queue/duel", authClient, function(req, res) {
		if (activeDuels[req.user._id]) {
			var world = activeDuels[req.user._id];
			var frontEndWorld = createFrontEndWorld(world, req.user);
			res.json(frontEndWorld);
		} else if (playerQueue.length > 1) {
			/*var player1Index = playerQueue.findIndex(function(player, index, array) {
				return player.user._id == req.user._id;
			});
			var player1 = playerQueue[player1Index];
			playerQueue.splice(player1Index, 1);*/
			var player2 = playerQueue.pop();
			var player1 = playerQueue.pop();
			var world = new World(player1, player2);
			world.initialize();
			activeDuels[player1.user._id] = world;
			activeDuels[player2.user._id] = world;
			delete playerSet[player1.user._id];
			delete playerSet[player2.user._id];
			var frontEndWorld = createFrontEndWorld(world, req.user);
			res.json(frontEndWorld);
		} else {
			res.send(400);
		}
	})
	
	appServer.post("/rest/duel/ability/:name", authClient, function(req, res) {
		var abilityName = req.params.name;
		var world = activeDuels[req.user._id];
		if (gameOver(world)) {
			res.status(400).send("The game has ended");
		} else {
			var ability = abilities.find(function(ability, index, array) {
				return ability.name === abilityName;
			})
			world.accept(ability);
			world.next();
			if (gameOver(world)) {
				cleanUp(world, req.user);
			}
			var frontEndWorld = createFrontEndWorld(world, req.user);
			res.json(frontEndWorld);
		}
	})
	
	appServer.get("/rest/duel", authClient, function(req, res) {
		var world = activeDuels[req.user._id];
		if (gameOver(world)) {
			delete activeDuels[req.user._id];
		}
		var frontEndWorld = createFrontEndWorld(world, req.user);
		res.json(frontEndWorld);
	})
	
	appServer.delete("/rest/duel", authClient, function(req, res) {
		res.send(200);
	})
	
	function gameOver(world) {
		return world.player1.character.attributes.hp <= 0 || world.player2.character.attributes.hp <= 0;
	}
	
	function cleanUp(world, user) {
		var winner = world.player1.character.attributes.hp <= 0 ? world.player2.user : world.player1.user;
		var loser = world.player1.character.attributes.hp <= 0 ? world.player1.user : world.player2.user;
		updateStats(winner, loser);
		delete activeDuels[user._id];
	}
	
	function updateStats(winner, loser) {
		if (winner.roles[0] != "guest") {
			UserModel.update({_id: winner._id}, {$inc: {wins: 1}}, function(err, numAffected) {
				if (err) {
					console.log(err);
				}
			})
		}
		if (loser.roles[0] != "guest") {
			UserModel.update({_id: loser._id}, {$inc: {losses: 1}}, function(err, numAffected) {
				if (err) {
					console.log(err);
				}
			})
		}
	}
	
	var createFrontEndWorld = function(world, user) {
		var playerCharacter;
		var opponentCharacter;
		var isPlayerTurn;
		if (strEq(new String(world.player1.user._id), new String(user._id))) {
			playerCharacter = world.player1.character;
			opponentCharacter = world.player2.character;
			isPlayerTurn = world.player1.isPlayerTurn
		} else if (strEq(new String(world.player2.user._id), new String(user._id))) {
			playerCharacter = world.player2.character;
			opponentCharacter = world.player1.character;
			isPlayerTurn = world.player2.isPlayerTurn;
		}
		var frontEndWorld = new FrontEndWorld(playerCharacter, opponentCharacter);
		frontEndWorld.isPlayerTurn = isPlayerTurn;
		
		return frontEndWorld;
	}
}	