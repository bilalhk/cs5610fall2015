(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("characterService", characterService);
	
	function characterService($q, $http) {
		
		var api = {
			createCharacter: createCharacter,
			findAbilityDescriptions: findAbilityDescriptions,
			addAbility: addAbility
		};
		
		// String -> Promise(Character)
		function createCharacter(name) {
			var deferred = $q.defer();
			var characterObject = {name: name};
			$http.post("/rest/character", characterObject).then(function(response) {
				var character = response.data;
				deferred.resolve(character);
			});
			
			return deferred.promise;
		}
		
		// -> Promise([AbilityDescription])
		function findAbilityDescriptions() {
			var deferred = $q.defer();
			$http.get("/rest/ability").then(function(response) {
				var abilityDescriptions = response.data;
				deferred.resolve(abilityDescriptions);
			})
			
			return deferred.promise;
		}
		
		// AbilityDescription -> Promise({message: String, character: Chararcter})
		function addAbility(abilityDescription) {
			var deferred = $q.defer();
			$http.post("/rest/character/ability", abilityDescription).then(function(response) {
				var character = response.data.character;
				var message = response.data.message;
				deferred.resolve({message: message, character: character});
			});
			
			return deferred.promise;
		}
		
		return api;
	}
	
})()