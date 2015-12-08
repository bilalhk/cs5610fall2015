(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("characterService", characterService);
	
	function characterService($q, $http) {
		
		var api = {
			createCharacter: createCharacter,
			findAbilityDescriptions: findAbilityDescriptions,
			addAbility: addAbility,
			removeAbility: removeAbility
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
		
		// -> Promise([Ability])
		function findAbilityDescriptions() {
			var deferred = $q.defer();
			$http.get("/rest/ability").then(function(response) {
				var abilityDescriptions = response.data;
				deferred.resolve(abilityDescriptions);
			})
			
			return deferred.promise;
		}
		
		// Ability -> Promise({message: String, character: Chararcter})
		function addAbility(ability) {
			var deferred = $q.defer();
			$http.post("/rest/character/ability", ability).then(function(response) {
				deferred.resolve(response.data);
			});
			
			return deferred.promise;
		}
		
		// Ability -> Promise(Character)
		function removeAbility(ability) {
			var deferred = $q.defer();
			var url = "/rest/character/ability/" + ability.name;
			$http.delete(url).then(function(response) {
				deferred.resolve(response.data);
			});
			
			return deferred.promise;
		}
		
		return api;
	}
	
})()