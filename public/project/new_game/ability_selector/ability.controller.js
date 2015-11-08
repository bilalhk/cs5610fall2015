(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("AbilitySelectorController", function($scope) {
	
		$scope.availableAbilities = [{name: "Axe Throw"},
									 {name: "Heat Vision"},
									 {name: "Steel-toed Boot"},
									 {name: "Baseball Bat"}];
		
		$scope.selectedAbilities = [{name: "Heat Vision"},
									{name: "Baseball Bat"}];
									
		$scope.wisdomPoints = 21;
	})
	
})();