(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("OpponentCharacterController", opponentCharacterController);
	
	function opponentCharacterController($stateParams, $scope, duelService) {
		
		var model = this;
		model.character = duelService.getCurrentWorld().opponent;
		
		$scope.$on("renderCharacter", function(event) {
			model.character = duelService.getCurrentWorld().opponent;
		})
	}
	
})()