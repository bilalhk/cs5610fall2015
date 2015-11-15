(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("ProfileController", profileController);
	
	function profileController($scope, $rootScope, $location, UserService) {
		
		$scope.loggedInUser = $rootScope.user;
		
		$scope.update = function() {
			UserService.updateUser($scope.loggedInUser.id, $scope.loggedInUser).then(updateUser);
		}
		
		function updateUser(users) {
			var userId = $scope.loggedInUser.id;
			var updatedUser = users.find(function(currentUser, index, array) {
				return currentUser.id == userId;
			});
			$rootScope.user = updatedUser;
			$location.url("/profile");
		}
	}
	
})();