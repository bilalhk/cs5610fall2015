var AbilityDescription = (function() {
	"use strict"
	
	return class {
		
		// String * String * (Character -> Boolean) -> AbilityDescription
		constructor(abilityName, description, verify) {
			this.name = abilityName;
			this.description = description;
			this.verify = verify;
		}
		
	}
	
})()