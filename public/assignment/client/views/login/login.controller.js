(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("LoginController", loginController);
	
	function loginController($rootScope, $location, UserService) {
		
		var model = this;
		
		model.login = function() {
			UserService.findUserByUsernameAndPassword(model.username, model.password).then(loginUser);
		}
		
		function loginUser(response) {
			var user = response.data;
			if (user == null) {
				return;
			}
			
			$rootScope.user = user;
			$location.url("/profile");
		}
	}	
	
})();