(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("ProfileController", profileController);
	
	function profileController(userService) {
		
		var model = this;
		
		model.user = userService.currentUser;
	}
	
})();