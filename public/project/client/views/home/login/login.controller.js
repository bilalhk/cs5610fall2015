(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("LoginController", loginController);
	
	function loginController($rootScope, $state, userService) {
			
		$rootScope.user = null;
		
		this.login = function() {
			var credentials = new Credentials(this.username, this.password);
			userService.findUserByCredentials(credentials).then(function(user) {
				$rootScope.user = user;
				if (user.username == "admin") {
					$state.go("characterGeneration");
				} else {
					$state.go("profile");
				}
			});
			
		}
		
	}
	
})();