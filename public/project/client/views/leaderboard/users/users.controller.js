(function() {
	
	angular.module("YeOldArena").controller("LeaderboardUsersController", leaderboardUsersController);
	
	function leaderboardUsersController(userService) {
		
		var model = this;
		
		userService.getUserStats().then(function(leaderboardEntries) {
			model.leaderboardEntries = leaderboardEntries;
		})
									 
	}
	
})();