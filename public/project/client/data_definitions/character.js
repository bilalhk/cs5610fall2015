var Character = (function() {
	"use strict"
	
	return class {
		
		// String * [Attribute] -> Character
		constructor(name, attributes) {
			this.name = name;
			this.attributes = attributes;
			this.abilities = [];
		}
		
		addAbility(ability) {
			this.abilities.push(ability);
			return this;
		}
		
		removeAbility(abilityName) {
			this.abilities = this.abilities.filter(function(ability, index, array) {
				return ability.abilityName != abilityName;
			})
		}
	}
	
})()