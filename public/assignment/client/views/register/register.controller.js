(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("RegisterController", registerController);
	
	function registerController($scope, $rootScope, $location, UserService) {
		
		$scope.register = function() {
			if ($scope.password != $scope.verifyPassword) {
				return;
			}
			
			var newUser = {username: $scope.username,
						   password: $scope.password,
						   email: $scope.email};
						   
			UserService.createUser(newUser).then(loginUser);
		}
		
		function loginUser(response) {
			$rootScope.user = response.data;
			$location.url("/profile");
		}
	}
	
})();