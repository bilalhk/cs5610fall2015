(function() {
	"use strict"
	
	angular.module("FormBuilderApp").factory("UserService", userService);
	
	function userService() {
		
		var api = {
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser			
		};
		
		var currentUsers = [];
		
		// String * String * (User/null -> any) -> undefined
		function findUserByUsernameAndPassword(username, password, callback) {
			var user = currentUsers.find(function(element) {
				return element.username == username && element.password == password;
			});
			
			callback(user == undefined ? null : user);
		}
		
		// ([User] -> any) -> undefined
		function findAllUsers(callback) {
			callback(currentUsers);
		}
		
		// User * (User -> any) -> undefined
		function createUser(user, callback) {
			var newUser = $.extend(true, {}, user);
			newUser.id = guid();
			currentUsers.push(newUser);
			callback(newUser);
		}
		
		// String * ([User] -> any) -> undefined
		function deleteUserById(userId, callback) {
			currentUsers = currentUsers.filter(function(element) {
				return element.id != userId;
			});
		}
		
		// String * User * (User -> any) -> undefined
		function updateUser(userId, user, callback) {
			currentUsers = currentUsers.map(function(currentValue) {
				return currentValue.id == userId ? user : currentValue;
			});
			
			callback(user);
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