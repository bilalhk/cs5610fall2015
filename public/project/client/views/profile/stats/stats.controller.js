(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("ProfileStatsController", profileStatsController);
	
	function profileStatsController(userService) {
		var model = this;
		
		userService.getUserStats().then(function(stats) {
			model.stats = stats;
		})
	}
	
})()