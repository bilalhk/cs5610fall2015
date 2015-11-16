(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("HeaderController", headerController);
	
	function headerController($scope, $location) {
		
		var model = this;
		
		var mainHeaderNavs = [{name: "Username", link: "#"},
		 					  {name: "Logout", link: "#"}];
			
		var loggedOutHeaderNavs = [{name: "Register", link: "#/register"},
								   {name: "Login", link: "#/login"}]
								   .concat(mainHeaderNavs);	
			
		model.headerNavs = loggedOutHeaderNavs;
		model.$location = $location;
		
		$scope.$on("$routeChangeStart", function(event, next, current) { 
			if ($location.url().match("/profile|/forms")) {
				model.headerNavs = mainHeaderNavs;
			} else if ($location.url().match("/home|/admin|/register|/login")) {
				model.headerNavs = loggedOutHeaderNavs;
			}
		});
	}
	
})();