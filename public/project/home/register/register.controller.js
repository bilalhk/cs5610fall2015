(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("RegisterController", function($scope, $rootScope, $state) {
		
		$scope.register = function() {
			$rootScope.user = {username: $scope.username};
			$state.go("profile");
		}
	})
	
})();