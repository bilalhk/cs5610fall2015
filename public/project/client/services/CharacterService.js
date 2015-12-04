(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("characterService", characterService);
	
	function characterService($q) {
		
		var api = {
			createCharacter: createCharacter
		};
		
		// String -> Promise(Character)
		function createCharacter(name) {
			var deferred = $q.defer();
			var character = new Character("Jesus", [
				new Attribute("HP", 85),
				new Attribute("Speed", 40),
				new Attribute("Mana", 84),
				new Attribute("Attack", 54),
				new Attribute("Defence", 89)
			]);
			deferred.resolve(character);
			
			return deferred.promise;
		}
		
		return api;
	}
	
})()