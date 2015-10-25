(function() {
	
	angular.module("FormBuilderApp").controller("ProfileController", profileController);
	
	function profileController($scope, $rootScope, $location, UserService) {
		var loggedInUser = $rootScope.user
		
		$scope.username = loggedInUser.username;
		$scope.password = loggedInUser.password;
		$scope.email = loggedInUser.email;
		
		$scope.update = function() {
			loggedInUser.username = $scope.username;
			loggedInUser.password = $scope.password;
			loggedInUser.firstName = $scope.firstName;
			loggedInUser.lastName = $scope.lastName;
			loggedInUser.email = $scope.email;
			
			UserService.updateUser(loggedInUser.id, loggedInUser, updateUserCallback);
		}
		
		function updateUserCallback(user) {
			console.log($rootScope.user);
			$rootScope.user = user;
			console.log($rootScope.user);
			$location.url("/profile");
		}
	}
	
})();