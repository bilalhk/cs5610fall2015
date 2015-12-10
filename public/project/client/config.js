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
			.state("profile.edit", {
				templateUrl: "views/profile/edit/edit.view.html",
				controller: "ProfileEditController",
				controllerAs: "profileEditModel"
			})
			.state("profile.stats", {
				templateUrl: "views/profile/stats/stats.view.html",
				controller: "ProfileStatsController",
				controllerAs: "profileStatsModel"
			})
			.state("new_game", {
				url: "/new_game",
				templateUrl: "views/new_game/new_game.view.html",
				controller: "NewGameController",
				controllerAs: "newGameModel"
			})
			.state("new_game.character", {
				templateUrl: "views/new_game/character/character.view.html"
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
			.state("register", {
				templateUrl: "views/register/register.view.html"
			})
			.state("duelQueue", {
				templateUrl: "views/duelQueue/duelQueue.view.html",
				controller: "DuelQueueController",
				controllerAs: "duelQueueModel"
			})
			.state("abilityGeneration", {
				url: "/ability_generation",
				templateUrl: "views/ability_generation/ability_gen.view.html",
				controller: "AbilityGenerationController",
				controllerAs: "abilityGenerationModel",
				resolve: {
					adminAuth: adminAuth
				}
			});
			
		function adminAuth(userService) {
			return userService.adminAuth();
		}
		
	});
	
})();