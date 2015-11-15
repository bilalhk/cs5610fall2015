(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("ProfileController", profileController);
	
	function profileController($scope, $rootScope, $location, UserService) {
		
		$scope.loggedInUser = $rootScope.user;
		
		$scope.update = function() {
			UserService.updateUser($scope.loggedInUser.id, $scope.loggedInUser, updateUserCallback);
		}
		
		function updateUserCallback(user) {
			$rootScope.user = user;
			$location.url("/profile");
		}
	}
	
})();