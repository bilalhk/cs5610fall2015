(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("OpponentCharacterController", opponentCharacterController);
	
	function opponentCharacterController($stateParams) {
		var model = this;
		model.character = $stateParams.world.opponent;
	}
	
})()