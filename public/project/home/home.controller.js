(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("HomeController", function($state) {
		
		$state.go("home.login");
	});
	
})();