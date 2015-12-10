(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("ProfileEditController", profileEditController);
	
	function profileEditController(userService) {
		
		var model = this;
		model.user = userService.getCurrentUser();
		
		model.update = function() {
			userService.update(model.user).then(function() {
				model.user = userService.getCurrentUser();
			})
		}
		
	}
	
})()