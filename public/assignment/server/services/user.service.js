var Credentials = require("../data_definitions/credentials.js");

module.exports = function(appServer, UserModel) {
	
	appServer.post("/api/assignment/user", function(req, res) {
		var user = req.body;
		UserModel.create(user).then(function(user) {
			res.json(user);
		});
	})
	
	appServer.get("/api/assignment/user", function(req, res) {
		var username = req.query.username;
		var password = req.query.password;
		var promise;
		
		if (username && password) {
			promise = 	getWithUsernameAndPassword(username, password);
		} else if (username) {
			promise = UserModel.findUserByUsername(username);
		} else {
			promise = UserModel.findAll();
		}
		
		promise.then(function(result) {
			res.json(result);
		});
	})
	
	appServer.get("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		UserModel.findById(id).then(function(user) {
			res.json(user);
		});
	})
	
	appServer.put("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		var user = req.body;
		UserModel.update(id, user).then(function(updatedUsers) {
			res.json(updatedUsers);
		});
	})
	
	appServer.delete("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		UserModel.remove(id).then(function(updatedUses) {
			res.json(updatedUses);
		});
	})
	
	// String * String -> Promise(User)
	function getWithUsernameAndPassword(username, password) {
		var credentials = Credentials(username, password);
		return UserModel.findUserByCredentials(credentials);
	}
	
}