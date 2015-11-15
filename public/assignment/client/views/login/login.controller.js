(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("LoginController", loginController);
	
	function loginController($scope, $rootScope, $location, UserService) {
		
		$scope.login = function() {
			UserService.findUserByUsernameAndPassword($scope.username, $scope.password, loginCallback);
		}
		
		function loginCallback(user) {
			if (user == null) {
				return;
			}
			
			$rootScope.user = user;
			$location.url("/profile");
		}
	}	
	
})();