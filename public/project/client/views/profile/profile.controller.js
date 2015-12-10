(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("ProfileController", profileController);
	
	function profileController($state, userService) {
		
		var model = this;
		model.$state = $state;
		model.user = userService.getCurrentUser();
		
		$state.go("profile.edit");
	}
	
})();