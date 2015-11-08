(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("HeaderController", headerController);
	
	function headerController($scope, $location) {
		
		var headerNavs = [{name: "Username", link: "#/profile"},
		 				  {name: "Logout", link: "#/login"}];	
			
		$scope.headerNavs = headerNavs;
		$scope.$location = $location;
	}
	
})();