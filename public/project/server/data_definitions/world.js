"use strict"

module.exports = class {
	
	// Player * Player -> World
	constructor(player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
		this.turnCounter = 0;
	}
	
	// -> World
	initialize() {
		this.turnCounter = 1;
		var player1Speed = this.player1.character.attributes.speed;
		var player2Speed = this.player2.character.attributes.speed;
		if (player1Speed > player2Speed) {
			this.player2.turnMeter = this.player2.turnMeter - player2Speed;
			this.player2.isPlayerTurn = false;
			this.player1.isPlayerTurn = true;
		} else {
			this.player1.turnMeter = this.player1.turnMeter - player1Speed;
			this.player1.isPlayerTurn = false;
			this.player2.isPlayerTurn = true;
		}
		
		return this;
	}

}