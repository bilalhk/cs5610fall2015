(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("RegisterController", registerController);
	
	function registerController($rootScope, $location, UserService) {
		
		var model = this;
		
		model.register = function() {
			if (model.password != model.verifyPassword) {
				return;
			}
			
			var newUser = {username: model.username,
						   password: model.password,
						   email: model.email};
						   
			UserService.createUser(newUser).then(loginUser);
		}
		
		function loginUser(response) {
			$rootScope.user = response.data;
			$location.url("/profile");
		}
	}
	
})();