(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("OpponentCharacterController", opponentCharacterController);
	
	function opponentCharacterController($stateParams, duelService) {
		
		var model = this;
		model.character = duelService.getCurrentWorld().opponent;
	}
	
})()