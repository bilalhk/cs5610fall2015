module.exports = function(appServer, UserModel, passport, auth) {
	
	appServer.post("/login", passport.authenticate("local"), function(req, res) {
		var user = req.user;
		res.json(user);
	})
	
	appServer.post("/login/guest", passport.authenticate("local"), function(req, res) {
		var user = req.user;
		res.json(user);
	})
	
	appServer.post("/logout", auth, function(req, res) {
		req.logout();
		res.json(null);
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