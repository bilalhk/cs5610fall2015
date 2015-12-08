(function() {
	"use strict"
	
	angular.module("YeOldArena").controller("DuelQueueController", duelQueueController);
	
	function duelQueueController($state, duelService) {
		
		var model = this;
		model.message = "Waiting for a match...";
		var intervalId;
		
		duelService.addToQueue().then(function() {
			intervalId = setInterval(function() {
				duelService.findMatch().then(function() {
					clearInterval(intervalId);
					$state.go("duel");
				})
			}, 2000);
		});
		
		model.quitQueue = function() {
			clearInterval(intervalId);
			duelService.quitQueue().then(function() {
				$state.go("new_game");
			})
		}
	}
	
})()