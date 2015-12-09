(function() {
	"use strict"
	
	angular.module("YeOldArena").factory("userService", userService);
	
	function userService($q, $http, $rootScope) {
		
		var api = {
			login: login,
			guestLogin: guestLogin,
			logout: logout,
			register: register,
			adminAuth: adminAuth,
			getUserStats: getUserStats,
			getCurrentUser: getCurrentUser
		};
		
		var currentUser;
		
		// -> User
		function getCurrentUser() {
			return currentUser;
		}
		
		// Credentials -> Promise(User)
		function login(credentials) {
			var deferred = $q.defer();
			$http.post("/login", credentials).then(function(response) {
				currentUser = response.data;
				$rootScope.loggedIn = true;
				deferred.resolve(currentUser);
			});
			
			return deferred.promise;
		}
		
		// -> Promise()
		function logout() {
			var deferred = $q.defer();
			$http.post("/logout", null).then(function(response) {
				currentUser = null;
				$rootScope.loggedIn = false;
				deferred.resolve();
			});
			
			return deferred.promise;
		}
		
		// User -> Promise(User)
		function register(user) {
			var deferred = $q.defer();
			$http.post("/register", user).then(function(response) {
				currentUser = response.data;
				$rootScope.loggedIn = true;
				deferred.resolve(currentUser);
			});
			
			return deferred.promise;
		}
		
		// -> Promise(User)
		function guestLogin() {
			var deferred = $q.defer();
			var credentials = new Credentials("guest", "guest");
			$http.post("/login/guest", credentials).then(function(response) {
				currentUser = response.data;
				$rootScope.loggedIn = true;
				deferred.resolve(currentUser);
			});
			
			return deferred.promise;
		}
		
		// -> Promise([Stats])
		function getUserStats() {
			var deferred = $q.defer();
			$http.get("/rest/user/stats").then(function(response) {
				deferred.resolve(response.data);
			})
			
			return deferred.promise;
		}
		
		// -> Promise()
		function adminAuth() {
			var deferred = $q.defer();
			$http.get("/loggedIn/admin").then(function(response) {
				response.data ? deferred.resolve() : deferred.reject();
			})
			
			return deferred.promise;
		}
		
		return api;
	}
	
})();