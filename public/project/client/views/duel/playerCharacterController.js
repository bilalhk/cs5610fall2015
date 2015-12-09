(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("PlayerCharacterController", playerCharacterController);
	
	function playerCharacterController($scope, $stateParams, duelService) {
		
		var model = this;
		model.character = duelService.getCurrentWorld().player;
		
		$scope.$on("renderCharacter", function(event) {
			model.character = duelService.getCurrentWorld().player;
		})
	}
	
})()