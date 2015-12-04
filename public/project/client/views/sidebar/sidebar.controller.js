(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("SidebarController", sidebarController);
	
	function sidebarController($rootScope, $location) {
		
		var clientSidebarNavs = [{name: "Profile", link: "#/profile"},
								 {name: "Start Game", link: "#/new_game"},
								 {name: "Leaderboard", link: "#/leaderboard"}];
								 
		var adminSidebarNavs = [{name: "Char. Gen.", link: "#/character_generation"},
								{name: "Ability Gen.", link: "#/ability_generation"}];
		
		if ($rootScope.user.username == "admin") {
			this.sidebarNavs = adminSidebarNavs;
		} else {
			this.sidebarNavs = clientSidebarNavs;
		}
		
		this.$location = $location;
	}
	
})();