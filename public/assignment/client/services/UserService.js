(function() {
	"use strict"
	
	angular.module("FormBuilderApp").factory("UserService", userService);
	
	function userService($http) {
		
		var api = {
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser			
		};
		
		// String * String -> Promise(User)
		function findUserByUsernameAndPassword(username, password) {
			var queryString = "?username=" + username + "&password=" + password; 
			return $http.get("/api/assignment/user" + queryString);
		}
		
		// -> Promise([User])
		function findAllUsers() {
			return $http.get("/api/assignment/user");
		}
		
		// User -> Promise(User)
		function createUser(user) {
			return $http.post("/api/assignment/user", user);
		}
		
		// String -> Promise([User])
		function deleteUserById(userId) {
			return $http.delete("/api/assignment/user/" + userId);
		}
		
		// String * User -> Promise(User)
		function updateUser(userId, user) {
			return $http.put("/api/assignment/user/" + userId, user);
		}
		
		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		}
		
		return api;
	}
	
})();