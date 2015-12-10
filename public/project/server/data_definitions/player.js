"use strict"

// Character * User -> Player
module.exports = function(character, user) {
	
	this.character = character;
	this.user = user;
	this.turnMeter = 100;
	this.isPlayerTurn = false;
	
}