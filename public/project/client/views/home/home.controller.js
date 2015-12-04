(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("HomeController", homeController);
	
	function homeController($state) {
		
		$state.go("home.login");
	}
	
})();