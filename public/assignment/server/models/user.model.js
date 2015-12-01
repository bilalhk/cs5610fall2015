var userSchema = require('./user.schema.js');
var Q = require('q');

module.exports = function(mongoose) {
	
	var api = {
		create: create,
		findAll: findAll,
		findById: findById,
		findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		update: update,
		remove: remove
	};
	
	var UserSchema = userSchema(mongoose);
	var UserModel = mongoose.model("UserModel", UserSchema);
	
	// User -> Promise(User)
	function create(user) {
		var userModel = new UserModel(user);
		var deferred = Q.defer();
		userModel.save(function(err, userModel) {
			deferred.resolve(userModel);
		});
		
		return deferred.promise;
	}
	
	// -> Promise([User])
	function findAll() {
		var deferred = Q.defer();
		UserModel.find(function(err, users) {
			deferred.resolve(users);
		});
		
		return deferred.promise;
	}
	
	// Number -> Promise(User)
	function findById(id) {
		var deferred = Q.defer();
		UserModel.findById(id, function(err, user) {
			deferred.resolve(user);
		});
		
		return deferred.promise;
	}
	
	// String -> Promise(User)
	function findUserByUsername(username) {
		var deferred = Q.defer();
		UserModel.findOne({username: username}, function(err, user) {
			deferred.resolve(user);
		})
		
		return deferred.promise;
	}
	
	// Credentials -> Promise(User)
	function findUserByCredentials(credentials) {
		var deferred = Q.defer();
		var conditions = {username: credentials.username, password: credentials.password};
		UserModel.findOne(conditions, function(err, user) {
			deferred.resolve(user);
		});
		
		return deferred.promise;
	}
	
	// String * User -> Promise([user])  
	function update(id, user) {
		var deferred = Q.defer();
		var conditions = {_id: id};
		var update = {$set: user};
		UserModel.update(conditions, update, function(err, numAffected) {
			findAll().then(function(users) {
				deferred.resolve(users);
			});
		});
		
		return deferred.promise;
	}
	
	// String -> Promise([User])
	function remove(id) {
		var deferred = Q.defer();
		var conditions = {_id: id};
		UserModel.remove(conditions, function(err) {
			findAll().then(function(users) {
				deferred.resolve(users);
			});
		});
		
		return deferred.promise;
	}
	
	return api;
}