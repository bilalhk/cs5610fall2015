(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("DuelController", duelController);
	
	function duelController($state, $stateParams, $scope, duelService) {
		var model = this;
		model.world = duelService.getCurrentWorld();
		
		var yourTurnStr = "It is your turn.";
		var oppTurnStr = "Waiting on your opponent";
		
		model.submitMove = function() {
			var selectedAbility = model.abilities[model.selectedAbilityIndex];
			if (world.isPlayerTurn) {
				duelService.submitMove(selectedAbility.name)
					.then(function success() {
						model.world = duelService.getCurrentWorld();
						model.message = oppTurnStr;
						$scope.$broadcast("renderCharacter");
						getPeriodicUpdates();
					}, function failure(message) {
						model.message = message;
					});
			}
		}
		
		function getPeriodicUpdates() {
			var intervalId = setInterval(function() {
				duelService.updateWorld().then(function() {
					model.world = duelService.getCurrentWorld();
					if (model.world.isPlayerTurn) {
						clearInterval(intervalId);
					}
				}, 2000);
			});
		}
			
		$state.go("duel.cardsDisplayed");
	}
	
})()