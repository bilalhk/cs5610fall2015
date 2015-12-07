var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser = require("cookie-parser");
var session = require("express-session");
var Deque = require("collections/deque");
var Map = require("collections/map");
var MatchmakingService = require("./services/matchmakingService");
var UserService = require("./services/userService");
var CharacterService = require("./services/characterService");
var userModel = require("./models/userModel");
var abilityModel = require("./models/abilityModel");

module.exports = function(appServer, mongoose) {
	
	// Configure App.
	appServer.use(session({secret: "Very Nasty Secret"}));
	appServer.use(cookieParser());
	appServer.use(passport.initialize());
	appServer.use(passport.session());
	
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
	
	// Set up queue for matchmaking.
	var unmatchedPlayers = new Deque();
	
	// Set up map of duel sessions.
	var activeDuels = new Map();
	
	// Retrieve abilities from database.
	var abilities = [];
	var abilityDescriptions = [];
	AbilityModel.find({}, function(err, docs) {
		docs.forEach(function(ability, index) {
			abilities.push(ability);
			abilityDescriptions.push({name: ability.name, description: ability.description});
		});
	});
	
	// Initialize services.
	UserService(appServer, UserModel, passport, auth);
	CharacterService(appServer, passport, auth, abilities, abilityDescriptions);
	//MatchmakingService(appServer, unmatchedPlayers, activeDuels);
	
}