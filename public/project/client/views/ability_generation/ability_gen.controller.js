(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("AbilityGenerationController", abilityGenerationController);
	
	function abilityGenerationController(abilityService) {
		
		var model = this;
		
		model.addAbility = function() {
			var visit = "(" + model.visit + ")";
			var ability = new Ability(model.name, model.wisdomCost, model.description, visit); 
			abilityService.addAbility(ability).then(function() {
				model.name = "";
				model.wisdomCost = 0;
				model.description = "";
				model.visit = "";
			})
		}
		
	}
	
})();