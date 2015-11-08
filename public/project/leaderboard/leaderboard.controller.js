(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("LeaderboardController", function($scope, $state) {
		
		$state.go("leaderboard.users");
		
		$scope.$state = $state;
	})
	
})();