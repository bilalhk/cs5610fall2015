(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("NewGameController", newGameController);
	
	function newGameController($scope, $state, characterService) {
		
		var model = this;		
		$state.go("new_game.character");
		
		model.createCharacter = function() {
			characterService.createCharacter(model.celebrityName).then(function(character) {
				$state.go("new_game.character");
				$scope.$broadcast("characterGeneration", character);
			})
		}
		
		model.startGame = function() {
			$state.go("duelQueue");
		}
		
	}
	
})();