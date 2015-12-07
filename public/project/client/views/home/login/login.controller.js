(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("LoginController", loginController);
	
	function loginController($state, $rootScope, userService) {
		
		var model = this;
		
		model.login = function() {
			var credentials = new Credentials(model.username, model.password);
			userService.login(credentials).then(function(user) {
				$state.go("profile");
			});
		}
		
		model.guestLogin = function() {
			userService.guestLogin().then(function(user) {
				$state.go("new_game");
			});
		}
		
	}
	
})();