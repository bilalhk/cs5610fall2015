(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("DuelController", duelController);
	
	function duelController($state, $stateParams) {
		var model = this;
		var world = $stateParams.world;
		model.abilities = world.player.abilities;
		
		model.submitMove = function() {
			var selectedAbility = model.abilities[model.selectedAbilityIndex];
			if (world.isPlayerTurn && selectedAbility.verify(world.player)) {
				
			}
		}
		
		$state.go("duel.cardsDisplayed");
	}
	
})()