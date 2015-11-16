(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("SidebarController", sidebarController);
	
	function sidebarController($location) {
		
		var model = this;
		
		var sidebarNavs = [{name: "Home", link: "#/home"},
						   {name: "Profile", link: "#/profile"},
						   {name: "Admin", link: "#/admin"},
						   {name: "Forms", link: "#/forms"}];
		
		model.sidebarNavs = sidebarNavs;
		model.$location = $location;
	}
	
})();