(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("HeaderController", headerController);
	
	function headerController($location, $state, userService) {
		
		var model = this;
		
		model.logout = function() {
			userService.logout().then(function() {
				$state.go("home");
			});
		}
		
	}
	
})();