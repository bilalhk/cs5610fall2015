(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("RegisterController", registerController);
	
	function registerController($state, userService) {
		
		var model = this;
		
		model.register = function() {
			var user = new User(model.username, model.password, model.email);
			userService.register(user).then(function(user) {
				$state.go("profile");
			});
		}
	}
	
})();