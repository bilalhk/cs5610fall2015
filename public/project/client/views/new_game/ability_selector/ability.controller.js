(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("AbilitySelectorController", abilitySelectorController);
	
	function abilitySelectorController($scope, characterService) {
	
		var model = this;
		
		characterService.findAbilityDescriptions().then(function(abilities) {
			model.availableAbilities = abilities;
		})
		
		$scope.$on("characterGeneration", function(event, character) {
			event.preventDefault();
			model.character = character;
		})
		
		model.addAbility = function(index) {
			var selectedAbility = model.availableAbilities[index];
			characterService.addAbility(selectedAbility).then(function(response) {
				model.character = response.character;
				model.message = response.message;
				model.availableAbilities.splice(index, 1);
			});
		}
		
	}
	
})();