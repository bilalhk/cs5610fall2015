(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("LeaderboardController", leaderboardController);
	
	function leaderboardController($state) {
		
		var model = this;
		model.$state = $state;
		$state.go("leaderboard.users");
	}
	
})();