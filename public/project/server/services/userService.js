module.exports = function(appServer, UserModel, passport, authClient, authAdmin) {
	
	appServer.post("/login", passport.authenticate("local"), function(req, res) {
		var user = req.user;
		res.json(user);
	})
	
	appServer.post("/login/guest", passport.authenticate("local"), function(req, res) {
		var user = req.user;
		res.json(user);
	})
	
	appServer.put("/rest/user", authClient, function(req, res) {
		var user = req.body;
		var conditions = {_id: req.user._id};
		var update = {firstName: user.firstName, lastName: user.lastName, email: user.email};
		UserModel.update(conditions, update, function(err, numAffected) {
			UserModel.findById(req.user._id, function(err, user) {
				res.json(user);
			})
		})
	})
	
	appServer.get("/loggedIn/client", authClient, function(req, res) {
		var index = req.user.roles.findIndex(function(role, index, array) {
			return role == "client";
		})
		
		index == -1 ? res.json(false) : res.json(true);
	})
	
	appServer.get("/loggedIn/admin", authAdmin, function(req, res) {
		var index = req.user.roles.findIndex(function(role, index, array) {
			return role == "admin";
		})
		
		index == -1 ? res.json(false) : res.json(true);
	})
	
	appServer.post("/logout", authClient, function(req, res) {
		if (req.user.roles[0] == "guest") {
			UserModel.remove({_id: req.user._id}, function(err) {
				if (err) console.log(err);
			})
		}		
		req.logout();
		res.json(null);
	})
	
	appServer.get("/rest/user/leaderboard", function(req, res) {
		UserModel.find({roles: {$ne: "guest"}})
			.limit(20)
			.sort({wins: -1})
			.select({username: 1, wins: 1, losses: 1})
			.exec(function(err, docs) {
				res.json(docs);
			})
	})
	
	appServer.get("/rest/user/:id/stats", authClient, function(req, res) {
		var paramId = req.params.id;
		if (paramId == req.user._id) {
			UserModel.findById(paramId)
				.select("wins losses")
				.exec(function(err, stats) {
					res.json(stats);
				})
		} else {
			res.send(401);
		}
	})
	
	appServer.post("/register", function(req, res) {
		var user = req.body;
		UserModel.create(user).then(function(user) {
			req.login(user, function(err) {
				res.json(user);
			})
		})
	})
	
}