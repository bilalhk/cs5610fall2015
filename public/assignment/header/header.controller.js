(function() {
	
	angular.module("FormBuilderApp").controller("HeaderController", headerController);
	
	function headerController($scope, $location) {
		
		var mainHeaderNavs = [
			{name: "Username", link: "#"},
			{name: "Logout", link: "#"}];
			
		var loggedOutHeaderNavs = [
			{name: "Register", link: "#/register"},
			{name: "Login", link: "#/login"}].concat(mainHeaderNavs);	
			
		$scope.headerNavs = loggedOutHeaderNavs;
		
		$scope.$on("$routeChangeStart", function(event, next, current) { 
			if ($location.url().match("/profile|/forms")) {
				$scope.headerNavs = mainHeaderNavs;
			} else if ($location.url().match("/home|/admin|/register|/login")) {
				$scope.headerNavs = loggedOutHeaderNavs;
			}
		});
	}
	
})();