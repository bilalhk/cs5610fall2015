(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("DuelController", duelController);
	
	function duelController($state, $stateParams, $scope, duelService) {
		var model = this;
		var world = $stateParams.world;
		model.abilities = world.player.abilities;
		
		model.submitMove = function() {
			var selectedAbility = model.abilities[model.selectedAbilityIndex];
			if (world.isPlayerTurn && selectedAbility.verify(world.player)) {
				duelService.submitMove(selectedAbility, world)
					.then(function(world) {
						$scope.$broadcast("renderCharacter", world);
					});
			}
		}
		
		$state.go("duel.cardsDisplayed");
	}
	
})()