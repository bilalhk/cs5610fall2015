(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("PlayerCharacterController", playerCharacterController);
	
	function playerCharacterController($stateParams, duelService) {
		
		var model = this;
		model.character = duelService.getCurrentWorld().player;
	}
	
})()