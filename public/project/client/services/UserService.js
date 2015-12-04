(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("userService", userService);
	
	function userService($q) {
		
		var api = {
			findUserByCredentials: findUserByCredentials
		};
		
		// Credentials -> Promise(User)
		function findUserByCredentials(credentials) {
			var deferred = $q.defer();	
			deferred.resolve(new User(credentials.username, "user"));
			
			return deferred.promise;
		}
		
		return api;
	}
	
})();