(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("AbilitySelectorController", abilitySelectorController);
	
	function abilitySelectorController($scope, characterService, abilityService) {
		var model = this;
		
		$scope.$on("characterGeneration", function(event, character) {
			model.character = character;
		})
		
		abilityService.findAbilities().then(function(abilities) {
			model.availableAbilities = abilities;
		})
		
		model.addAbility = function(index) {
			model.selectedAbility = model.availableAbilities[index];
			console.log(model.selectedAbility);
			characterService.addAbility(model.selectedAbility).then(function(response) {
				console.log(response);
				model.character = response.character;
				model.message = response.message;
				model.availableAbilities.splice(index, 1);
			});
		}
		
		model.removeAbility = function(index) {
			model.selectedAbility= model.character.abilities[index];
			characterService.removeAbility(model.selectedAbility).then(function(character) {
				model.character = character;
				model.availableAbilities.push(model.selectedAbility);
			});
		}
		
	}
	
})();