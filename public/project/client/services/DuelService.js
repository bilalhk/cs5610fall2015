(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("duelService", duelService);
	
	function duelService($q) {
		var api = {
			startNewDuel: startNewDuel,
			submitMove: submitMove
		};
		
		// Character -> Promise(World)
		function startNewDuel(character) {
			var deferred = $q.defer();
			var player = new Character("Jesus", [
				new Attribute("HP", 85),
				new Attribute("Speed", 40),
				new Attribute("Mana", 84),
				new Attribute("Attack", 54),
				new Attribute("Defence", 89)
				]);
			player.addAbility(new AbilityDescription("A1", "D1", function() {}));
			player.addAbility(new AbilityDescription("A2", "D2", function() {}));
			var frontEndWorld = new FrontEndWorld(
				player,
				new Character("Goliath", [
				new Attribute("HP", 24),
				new Attribute("Speed", 44),
				new Attribute("Mana", 99),
				new Attribute("Attack", 24),
				new Attribute("Defence", 98)
				]));
			frontEndWorld.setPlayerTurn(true);
			deferred.resolve(frontEndWorld);
			
			return deferred.promise;
		}
		
		// AbilityDescription -> Promise(World)
		function submitMove(ability) {
			
		}
		
		return api;
	}
	
})()