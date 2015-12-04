(function() {
	
	angular.module("YeOldArena").controller("LeaderboardUsersController", leaderboardUsersController);
	
	function leaderboardUsersController() {
		
		this.leaderboardEntries = [{username: "Bob", wins: 10, losses: 0},
									 {username: "Rob", wins: 8, losses: 2},
									 {username: "Nancy", wins: 6, losses: 3},
									 {username: "Chris", wins: 3, losses: 6}];
									 
	}
	
})();