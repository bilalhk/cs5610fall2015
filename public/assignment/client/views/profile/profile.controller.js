(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("ProfileController", profileController);
	
	function profileController($rootScope, $location, UserService) {
		
		var model = this;
		
		model.loggedInUser = $rootScope.user;
		
		model.update = function() {
			UserService.updateUser(model.loggedInUser._id, model.loggedInUser).then(updateUser);
		}
		
		function updateUser(response) {
			var users = response.data;
			var userId = model.loggedInUser._id;
			var updatedUser = users.find(function(currentUser, index, array) {
				return currentUser._id == userId;
			});
			$rootScope.user = updatedUser;
			$location.url("/profile");
		}
	}
	
})();