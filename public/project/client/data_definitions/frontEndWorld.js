var FrontEndWorld = (function() {
	"use strict"
	
	return class {
		
		// Character * Character -> World
		constructor(player, opponent) {
			this.player = player;
			this.opponent = opponent;
			this.isPlayerTurn = false;
		}
		
		setPlayerTurn(isPlayerTurn) {
			this.isPlayerTurn = isPlayerTurn; 
		}
	}
	
})()