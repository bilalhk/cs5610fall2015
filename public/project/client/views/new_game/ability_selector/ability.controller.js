(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("AbilitySelectorController", abilitySelectorController);
	
	function abilitySelectorController($scope, abilityService) {
	
		var model = this;
		
		abilityService.findAvailableAbilities().then(function(abilities) {
			model.availableAbilities = abilities;
		})
		
		$scope.$on("characterGeneration", function(event, character) {
			event.preventDefault();
			model.character = character;
		})
		
		model.addAbility = function(index) {
			var selectedAbility = model.availableAbilities[index];
			model.availableAbilities.splice(index, 1);
			model.character.addAbility(selectedAbility);
		}
		
	}
	
})();