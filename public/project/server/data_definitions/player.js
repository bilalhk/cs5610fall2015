"use strict"

module.exports = class {
	
	// Character * User -> Player
	constructor(character, user) {
		this.character = character;
		this.user = user;
		this.turnMeter = 100;
		this.isPlayerTurn = false;
	}
	
}