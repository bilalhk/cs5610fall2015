(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("ProfileController", function($scope, $rootScope) {
		
		$scope.user = $rootScope.user;
	})
	
})();