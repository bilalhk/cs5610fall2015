(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("SearchbarController", searchbarController);
	
	function searchbarController($scope) {
		
		var model = this;
		
		this.submit = function() {
			$scope.$emit("searchSubmit", model.searchText);
			
			/*characterService.createCharacter(this.searchText).then(function(character) {
				$scope.$emit("characterGeneration", character);
			})*/
		}
		
	}
	
})();