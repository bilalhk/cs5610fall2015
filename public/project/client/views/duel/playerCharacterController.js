(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("PlayerCharacterController", playerCharacterController);
	
	function playerCharacterController($stateParams) {
		var model = this;
		var world = $stateParams.world;
		
		model.character = world.player;
	}
	
})()