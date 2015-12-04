(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("LeaderboardCharactersController", leaderboardCharactersController);
	
	function leaderboardCharactersController() {
		
		this.leaderboardEntries = [{character: "Alexandar Garaham Bell", wins: 10, losses: 0},
									 {character: "Abraham Lincoln", wins: 8, losses: 2},
									 {character: "Leonardo da Vinci", wins: 6, losses: 3},
									 {character: "Friedrich Nietzsche", wins: 3, losses: 6}];
		
	}
	
})();