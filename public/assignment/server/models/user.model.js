var users = require('./user.mock.json');

module.exports = function() {
	
	var api = {
		create: create,
		findAll: findAll,
		findById: findById,
		findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		update: update,
		remove: remove
	}
	
	// User -> [User]
	function create(user) {
		users.push(user);
		return user;
	}
	
	// -> [User]
	function findAll() {
		return users;
	}
	
	// Number -> User
	function findById(id) {
		var user = users.find(function(currentUser, index, array) {
			return currentUser.id == id;
		});
		
		return user != undefined ? user : null;
	}
	
	// String -> User
	function findUserByUsername(username) {
		var user = users.find(function(currentUser, index, array) {
			return currentUser.username == username;
		});
		
		return user != undefined ? user : null;
	}
	
	// Credentials -> User
	function findUserByCredentials(credentials) {
		var user = users.find(function(currentUser, index, array) {
			return (currentUser.username == credentials.username) && (currentUser.password == credentials.password);
		});
		
		return user != undefined ? user : null;
	}
	
	// Number * User -> [user]  
	function update(id, user) {
		var outdatedUser = users.find(function(currentUser, index, array) {
			return currentUser.id == id;
		});
		
		outdatedUser = user;
		return users;
	}
	
	// Number -> [User]
	function remove(id) {
		users = users.filter(function(currentUser, index, array) {
			return currentUser.id != id;
		});
		
		return users;
	}
	
	return api;
}