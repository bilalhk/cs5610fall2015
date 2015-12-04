(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("LeaderboardController", leaderboardController);
	
	function leaderboardController($state) {
		
		$state.go("leaderboard.users");
		
		this.$state = $state;
	}
	
})();