"use strict"

module.exports = class {
	
	constructor(name, attributes) {
		this.name = name;
		this.attributes = attributes;
		this.abilities = [];
	}
	
	addAbility(ability) {
		this.abilities.push(ability)
	}
	
	removeAbilityByName(abilityName) {
		this.abilities.filter(function(ability, index, array) {
			return ability.name != abilityName;
		})
	}
	
}