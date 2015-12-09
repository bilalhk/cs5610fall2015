(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("characterService", characterService);
	
	function characterService($q, $http) {
		
		var api = {
			createCharacter: createCharacter,
			addAbility: addAbility,
			removeAbility: removeAbility
		};
		
		var currentCharacter;
		
		// String -> Promise(Character)
		function createCharacter(name) {
			var deferred = $q.defer();
			var characterObject = {name: name};
			$http.post("/rest/character", characterObject).then(function(response) {
				currentCharacter = response.data;
				deferred.resolve(response.data);
			});
			
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