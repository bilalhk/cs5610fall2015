(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("ProfileController", profileController);
	
	function profileController($rootScope) {
		
		this.user = $rootScope.user;
	}
	
})();