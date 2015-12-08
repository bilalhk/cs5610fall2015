(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("duelService", duelService);
	
	function duelService($q, $http) {
		var api = {
			addToQueue: addToQueue,
			quitQueue: quitQueue,
			findMatch: findMatch,
			submitMove: submitMove,
			updateWorld: updateWorld,
			getCurrentWorld: getCurrentWorld
		};
		
		var currentWorld;
		
		// -> Promise()
		function addToQueue() {
			var deferred = $q.defer();
			$http.post("/rest/duel").then(function() {
				console.log("called add to queue");
				deferred.resolve();
			})
			
			return deferred.promise;
		}
		
		function quitQueue() {
			var deferred = $q.defer();
			$http.delete("/rest/duel/").then(function() {
				deferred.resolve();
			});
			
			return deferred.promise;
		}
		
		// -> Promise()
		function findMatch() {
			var deferred = $q.defer();
			$http.get("/rest/duel").then(function(response) {
				currentWorld = response.data;
				console.log(currentWorld);
				deferred.resolve();
			});
			
			return deferred.promise;
		}
		
		// String -> Promise()
		function submitMove(abilityName) {
			var deferred = $q.defer();
			var url = "/rest/duel/ability" + abilityName;
			$http.post(url).then(function success(response) {
				currentWorld = response.data;
				deferred.resolve();
			}, function error(response) {
				deferred.resolve(response.data);
			});
			
			return deferred.promise;
		}
		
		// -> Promise()
		function updateWorld() {
			var deferred = $q.defer();
			$http.get("/rest/duel")
		}
		
		// -> FrontEndWorld
		function getCurrentWorld() {
			return currentWorld
		}
		
		return api;
	}
	
})()