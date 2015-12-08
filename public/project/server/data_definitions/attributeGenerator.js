var now = new Date();
var idealAgeForStr = 35;
var idealAgeForHp = 25;
var idealHeightForSpeed = 1.7;
var idealAgeForWisdom = 60;

module.exports = function(characterBioJSON) {
	
	// Extract bio from JSON.
	var dob = new Date("7 August 1975");
	var gender = characterBioJSON.actorActress == "Actor" ? "M" : "F";
	var starSign = characterBioJSON.starSign;
	var height = parseFloat(characterBioJSON.height.match(/\d\.\d/)[0]);	
	
	var random = function(low, high) {
		return Math.random() * (high - low) + low;
	}
	
	var generateStrength = function() {
		var idealAgeDiff = Math.abs(idealAgeForStr - (now.getFullYear() - dob.getFullYear()));
		var strength = Math.round(100 - idealAgeDiff * random(0.8, 1.2));
		
		return Math.max(strength, 10);
	}
	
	var generateHp = function() {
		var idealAgeDiff = Math.abs(idealAgeForHp - (now.getFullYear() - dob.getFullYear()));
		var hp = Math.round(100 - idealAgeDiff * random(0.8, 1.2));
		
		return Math.max(hp, 10);
	}
	
	var generateWisdom = function() {
		var starSignDebuff = 0;
		if (starSign == "Leo" || starSign == "Libra" || starSign == "Cancer" || starSign == "Pisces") {
			starSignDebuff = 15;
		}
		var idealAgeDiff = Math.abs(idealAgeForWisdom - (now.getFullYear() - dob.getFullYear()));
		var wisdom = Math.round(60 - idealAgeDiff * random(.8, 1.2) - starSignDebuff);
		
		return Math.max(wisdom, 10);
	}
	
	var generateSpeed = function() {
		var idealHeightDiff = Math.abs(idealHeightForSpeed - 1.4);
		var speed = Math.round(100 - random(1,50));
		
		return Math.max(speed, 10);
	}
	
	var generateDefence = function() {
		var defence = Math.round(100 - 30 * random(.7, 1.2));
		
		return defence;
	}
	
	var generateMana = function() {
		var mana = Math.round(100 - 30 * random(.7, 1.2));
		
		return mana;
	}
	
	return {
		strength: generateStrength(),
		hp: generateHp(),
		wisdom: generateWisdom(),
		speed: generateSpeed(),
		defence: generateDefence(),
		mana: generateMana()
	};
	
}