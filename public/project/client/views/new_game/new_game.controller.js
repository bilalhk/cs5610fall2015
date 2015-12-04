(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("NewGameController", newGameController);
	
	function newGameController($scope, $state, characterService, duelService) {
		
		var model = this;
		
		$scope.$on("searchSubmit", function(event, searchText) {
			event.stopPropagation();
			characterService.createCharacter(searchText).then(function(character) {
				model.character = character;
				$scope.$broadcast("characterGeneration", character);
			})
		})
		
		this.startNewGame = function() {
			duelService.startNewDuel(model.character).then(function(world) {
				$state.go("duel", {world: world});
			})
		}
	}
	
})();