var Credentials = require("../data_definitions/credentials.js");
var uuid = require('uuid');

module.exports = function(appServer, usersModel) {
	
	appServer.post("/api/assignment/user", function(req, res) {
		var user = req.body;
		user.id = uuid.v1();
		user = usersModel.create(user);
		
		res.json(user);
	})
	
	appServer.get("/api/assignment/user", function(req, res) {
		var username = req.query.username;
		var password = req.query.password;
		var user;
		
		if (username && password) {
			user = 	getWithUsernameAndPassword(username, password);
			res.json(user);
		} else if (username) {
			user = usersModel.findUserByUsername(username);
		} else {
			user = usersModel.findAll();
		}
	})
	
	appServer.get("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		var user = usersModel.findById(id);
		
		res.json(user);
	})
	
	appServer.put("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		var user = req.body;
		var updatedUsers = usersModel.update(id, user);
		res.json(updatedUsers);
	})
	
	appServer.delete("/api/assignment/user/:id", function(req, res) {
		var id = req.params.id;
		var updatedUsers = usersModel.remove(id);
		
		res.json(updatedUsers);
	})
	
	// String * String -> User
	function getWithUsernameAndPassword(username, password) {
		var credentials = Credentials(username, password);
		var user = usersModel.findUserByCredentials(credentials);
		
		return user;
	}
	
}