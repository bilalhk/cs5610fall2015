"use strict"

module.exports = (function(){
	
	// Player * Player -> World
	var World = function(player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
		this.turnCounter = 0;
	}
	
	// -> World
	World.prototype.initialize = function() {
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
	
	// -> World
	World.prototype.accept = function(ability) {
		ability.visit(this);
		
		return this;
	}
	
	// -> World
	World.prototype.next = function() {
		this.turnCounter++;
		this.player1.turnMeter = this.player1.turnMeter - this.player1.character.attributes.speed;
		this.player2.turnMeter = this.player2.turnMeter - this.player2.character.attributes.speed;
		if (this.player1.turnMeter < this.player2.turnMeter) {
			this.player1.isPlayerTurn = true;
			this.player2.isPlayerTurn = false;
			this.player1.turnMeter = 100;
		} else {
			this.player2.isPlayerTurn = true;
			this.player1.isPlayerTurn = false;
			this.player2.turnMeter = 100;
		}
		
		return this;
	}
	
	return World;
	
})();

/*function(world) {
		var target = world.player1.isPlayerTurn ? world.player2 : world.player1;
		var attacker = world.player1.isPlayerTurn ? world.player1 : world.player2;
		var damage = Math.round(attacker.character.attributes.strength * .1);
		target.character.attributes.hp = target.character.attributes.hp - damage;
}*/