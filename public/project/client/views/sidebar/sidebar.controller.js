(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("SidebarController", sidebarController);
	
	function sidebarController($rootScope, $location, userService) {
		
		var model = this;
		model.user = userService.currentUser;
		
		var clientSidebarNavs = [{name: "Profile", link: "#/profile"},
								 {name: "Start Game", link: "#/new_game"},
								 {name: "Leaderboard", link: "#/leaderboard"}];
								 
		var adminSidebarNavs = [{name: "Char. Gen.", link: "#/character_generation"},
								{name: "Ability Gen.", link: "#/ability_generation"}];
		
		if (model.currentUser == "admin") {
			model.sidebarNavs = adminSidebarNavs;
		} else {
			model.sidebarNavs = clientSidebarNavs;
		}
		
		model.$location = $location;
	}
	
})();