(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("LoginController", function($scope, $rootScope, $state) {
		
		$rootScope.user = null;
		
		$scope.login = function() {
			$rootScope.user = {username: $scope.username};
			
			if ($scope.username == "admin") {
				$state.go("characterGeneration");
			} else {
				$state.go("profile");
			}
		}
		
	})
	
})();