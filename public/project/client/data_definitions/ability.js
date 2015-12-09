var Ability = (function() {
	"use strict"
	
	return class {
		
		// String * Number * String * (World -> World) -> Abilityt
		constructor(name, wisdomCost, description, visit) {
			this.name = name;
			this.wisdomCost = wisdomCost;
			this.description = description;
			this.visit = visit;
		}
		
	}
	
})()