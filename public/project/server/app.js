var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser = require("cookie-parser");
var session = require("express-session");
var timeout = require("connect-timeout");
var UserService = require("./services/userService");
var CharacterService = require("./services/characterService");
var DuelService = require("./services/duelService");
var userModel = require("./models/userModel");
var abilityModel = require("./models/abilityModel");

module.exports = function(appServer, mongoose) {
	
	// Configure App.
	appServer.use(session({secret: "Very Nasty Secret"}));
	appServer.use(cookieParser());
	appServer.use(passport.initialize());
	appServer.use(passport.session());
	//appServer.use(timeout(20000));
	//appServer.use(haltOnTimedout);
	
	// Initialize Models.
	var UserModel = userModel(mongoose);
	var AbilityModel = abilityModel(mongoose);
	
	// Configure Passport.
	passport.use(new LocalStrategy(function(username, password, done) {
		if(username == "guest" && password == "guest") {
			UserModel.create({roles: ["guest"]}).then(function(user) {				
				return done(null, user);
			});
		} else {
			UserModel.findOne({username: username, password: password}, function(err, user) {
				if (err) {
					return done(err);
				}
			
				if (!user) {
					return done(null, false);
				}
			
				return done(null, user);
			})
		}
	}));
	
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	})
	
	passport.deserializeUser(function(id, done) {
		UserModel.findById(id, function(err, user) {
			done(err, user);
		});
	})
	
	function auth(req, res, next) {
		if (!req.isAuthenticated()) {
			res.send(401);
		} else {
			next();
		}
	}
	
	// Queue for matchmaking.
	var playerQueue = [];
	
	// Set of players already in queue.
	var playerSet = {};
	
	// Set up map of duel sessions.
	var activeDuels = {};
	
	// Retrieve abilities from database.
	var abilities = [];
	AbilityModel.find({}, function(err, docs) {		
		docs.forEach(function(ability, index) {
			var visit = eval(ability.visit);
			var evaledAbility = {name: ability.name, wisdomCost: ability.wisdomCost, description: ability.description, visit: visit};
			abilities.push(evaledAbility);
		});
	});
	
	// Initialize services.
	UserService(appServer, UserModel, passport, auth);
	CharacterService(appServer, passport, auth, abilities);
	DuelService(appServer, auth, playerQueue, playerSet, activeDuels, abilities);
	//MatchmakingService(appServer, unmatchedPlayers, activeDuels);
	
	
	function haltOnTimedout(req, res, next) {
		if (!req.timedout) {
			next();
		}
	}
}