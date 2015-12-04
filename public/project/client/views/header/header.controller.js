(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("HeaderController", headerController);
	
	function headerController($location) {
		
		var headerNavs = [{name: "Username", link: "#/profile"},
		 				  {name: "Logout", link: "#/login"}];	
			
		this.headerNavs = headerNavs;
		this.$location = $location;
	}
	
})();