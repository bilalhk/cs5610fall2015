(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("abilityService", abilityService);
	
	function abilityService($q, $http) {
		
		var api = {
			findAbilities: findAbilities,
			addAbility: addAbility
		}
		
		// -> Promise([Ability])
		function findAbilities() {
			var deferred = $q.defer();
			$http.get("/rest/ability").then(function(response) {
				var abilityDescriptions = response.data;
				deferred.resolve(abilityDescriptions);
			})
			
			return deferred.promise;
		}
		
		// Ability -> Promise()
		function addAbility(ability) {
			var deferred = $q.defer();
			$http.post("/rest/ability", ability).then(function(response) {
				deferred.resolve();
			})
			
			return deferred.promise;
		}
		
		return api;
	}

})()