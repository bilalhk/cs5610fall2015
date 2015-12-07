(function() {
	"use strict"
	
	angular.module("YeOldArena").config(function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise("/home");
		
		$stateProvider
			.state("home", {
				url: "/home",
				templateUrl: "views/home/home.view.html",
				controller: "HomeController",
				controllerAs: "homeModel"
			})
			.state("home.login", {
				templateUrl: "views/home/login/login.view.html",
				controller: "LoginController",
				controllerAs: "loginModel"
			})
			.state("home.register", {
				templateUrl: "views/home/register/register.view.html",
				controller: "RegisterController",
				controllerAs: "registerModel"
			})
			.state("profile", {
				url: "/profile",
				templateUrl: "views/profile/profile.view.html",
				controller: "ProfileController",
				controllerAs: "profileModel"
			})
			.state("new_game", {
				url: "/new_game",
				templateUrl: "views/new_game/new_game.view.html",
				controller: "NewGameController",
				controllerAs: "newGameModel"
			})
			.state("duel", {
				url: "/duel",
				templateUrl: "views/duel/duel.view.html",
				controller: "DuelController",
				controllerAs: "duelModel",
				params: {
					world: null
				}
			})
			.state("duel.cardsDisplayed", {
				views: {
					'thisPlayer': {
						templateUrl: "views/character_card/card.view.html",
						controller: "PlayerCharacterController",
						controllerAs: "cardModel"
					},
					'otherPlayer': {
						templateUrl: "views/character_card/card.view.html",
						controller: "OpponentCharacterController",
						controllerAs: "cardModel"
					}
				},
			})
			.state("leaderboard", {
				url: "/leaderboard",
				templateUrl: "views/leaderboard/leaderboard.view.html",
				controller: "LeaderboardController",
				controllerAs: "leaderboardModel" 
			})
			.state("leaderboard.users", {
				templateUrl: "views/leaderboard/users/users.view.html",
				controller: "LeaderboardUsersController",
				controllerAs: "leaderboardUsersModel"
			})
			.state("leaderboard.characters", {
				templateUrl: "views/leaderboard/characters/characters.view.html",
				controller: "LeaderboardCharactersController",
				controllerAs: "leaderboardCharactersModel"
			})
			.state("register", {
				templateUrl: "views/register/register.view.html"
			})
			.state("characterGeneration", {
				url: "/character_generation",
				templateUrl: "views/character_generation/character_gen.view.html",
				controller: "CharacterGenerationController",
				controllerAs: "characterGenerationModel"
			})
			.state("abilityGeneration", {
				url: "/ability_generation",
				templateUrl: "views/ability_generation/ability_gen.view.html",
				controller: "AbilityGenerationController",
				controllerAs: "abilityGenerationModel"
			});
	});
	
})();