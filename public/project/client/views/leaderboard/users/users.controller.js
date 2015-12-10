(function() {
	
	angular.module("YeOldArena").controller("LeaderboardUsersController", leaderboardUsersController);
	
	function leaderboardUsersController(userService) {
		
		var model = this;
		
		userService.getLeaderboard().then(function(leaderboardEntries) {
			model.leaderboardEntries = leaderboardEntries;
		})
									 
	}
	
})();