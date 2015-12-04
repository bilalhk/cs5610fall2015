(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("abilityService", abilityService);
	
	function abilityService($q) {
		var api = {
			findAvailableAbilities: findAvailableAbilities
		}
		
		var availableAbilities = [
			new AbilityDescription("Axe Throw", "Axe Throw Description!", function(character) {return true;}),
			new AbilityDescription("Heat Vision", "Heat Vision Description!", function(character) {return true;}),
			new AbilityDescription("Steel-toed boot", "Steel-toed Boot Description!", function(character) {return true;}),
			new AbilityDescription("Baseball bat", "Baseball bat Description!", function(character) {return true;})
		];
		
		// -> Promise([AbilityDescription])
		function findAvailableAbilities() {
			var deferred = $q.defer();
			deferred.resolve(availableAbilities);
			
			return deferred.promise;
		}
		
		return api;
	}
	
})()