(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("DuelController", duelController);
	
	function duelController($state, $stateParams, $scope, duelService) {
		var model = this;
		model.world = duelService.getCurrentWorld();
		
		var yourTurnStr = "It is your turn.";
		var oppTurnStr = "Waiting on your opponent";
		var win = "You Win!";
		var loss = "You Lose!";
		
		if (!model.world.isPlayerTurn) {
			getPeriodicUpdates();
		}
		
		updateMessage();
		
		model.submitMove = function() {
			var selectedAbility = model.world.player.abilities[model.selectedAbilityIndex];
			if (model.world.isPlayerTurn) {
				duelService.submitMove(selectedAbility.name)
					.then(function success() {
						model.world = duelService.getCurrentWorld();
						updateMessage();
						$scope.$broadcast("renderCharacter");
						getPeriodicUpdates();
					}, function failure(message) {
						model.message = message;
					});
			}
		}
		
		function updateMessage() {
			if (gameOver(duelService.getCurrentWorld())) {
				if (duelService.getCurrentWorld().player.attributes.hp <= 0) {
					model.message = loss;
				} else {
					model.message = win;
				}
			} else if (duelService.getCurrentWorld().isPlayerTurn) {
				model.message = yourTurnStr;
			} else {
				model.message = oppTurnStr;
			}
		}
		
		function getPeriodicUpdates() {
			if (gameOver()) {
				return;
			}
			var intervalId = setInterval(function() {
				duelService.getDuel().then(function() {
					model.world = duelService.getCurrentWorld();
					$scope.$broadcast("renderCharacter");
					if (gameOver()) {
						updateMessage();
						clearInterval(intervalId);
					} else if (model.world.isPlayerTurn) {
						updateMessage();
						clearInterval(intervalId);
					}
				})
			}, 2000);
		}
		
		function gameOver() {
			return duelService.getCurrentWorld().player.attributes.hp <= 0 || duelService.getCurrentWorld().opponent.attributes.hp <= 0;
		}
			
		$state.go("duel.cardsDisplayed");
	}
	
})()