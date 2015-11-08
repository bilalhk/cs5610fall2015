(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("CardController", function($scope) {
		
		$scope.attributes = [{name: "HP", value: 95},
							 {name: "Speed", value: 66},
							 {name: "Mana", value: 82},
							 {name: "Attack", value: 35},
							 {name: "Defense", value: 75}];
	})
	
	
})();