(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("SidebarController", sidebarController);
	
	function sidebarController($location, userService) {
		
		var model = this;
		model.$location = $location;
		
		var baseSidebarNavs = [{name: "Start Game", link: "#/new_game"},
							   {name: "Leaderboard", link: "#/leaderboard"}];
		
		var clientSidebarNavs = [{name: "Profile", link: "#/profile"}];
								 
								 
		var adminSidebarNavs = [{name: "Ability Gen.", link: "#/ability_generation"}];
		
		if (userService.getCurrentUser().roles.indexOf("admin") != -1) {
			model.sidebarNavs = baseSidebarNavs.concat(clientSidebarNavs, adminSidebarNavs);
		} else if (userService.getCurrentUser().roles.indexOf("client") != -1) {
			model.sidebarNavs = baseSidebarNavs.concat(clientSidebarNavs);
		} else if (userService.getCurrentUser().roles.indexOf("guest") != -1) {
			model.sidebarNavs = baseSidebarNavs;
		}
	}
	
})();