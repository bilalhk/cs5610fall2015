(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("CardController", cardController);
	
	function cardController($scope) {
		
		var model = this;
		
		$scope.$on("characterGeneration", function(event, character) {
			model.character = character;
		})
		
	}
	
})();