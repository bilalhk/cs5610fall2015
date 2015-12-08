var Player = require("../data_definitions/player");
var World = require("../data_definitions/world");
var FrontEndWorld = require("../data_definitions/frontEndWorld");
var strEq = require("../util/stringEquality");

module.exports = function(appServer, auth, playerQueue, playerSet, activeDuels) {
	
	appServer.post("/rest/duel", auth, function(req, res) {
		if (playerSet[req.user._id]) {
			res.send(400);
		} else {
			var player = new Player(req.session.character, req.user);
			playerQueue.push(player);
			playerSet[req.user._id] = true;
			res.send(200);
		}
	})
	
	appServer.get("/rest/duel", auth, function(req, res) {
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
	
	appServer.delete("/rest/duel", auth, function(req, res) {
		res.send(200);
	})
	
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