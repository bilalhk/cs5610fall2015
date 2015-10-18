(function() {
	
	angular.module("FormBuilderApp").controller("HeaderController", headerController);
	
	function headerController($scope, $location) {
		
		var headerNavs = [{name: "Username", link: "#"}, {name: "Logout", link: "#"}];
		console.log($location.url().match("/home + /forms") != null);
		if ($location.url().match("/profile + /forms") != null) {
			$scope.headerNavs = headerNavs;
		} else if ($location.url().match("/home + /admin + /Register + /Login") != null) {
			var extraHeaderNavs = [{name: "Register", link: "#/Register"}, {name: "Login", link: "#/Login"}];
			$scope.headerNavs = extraHeaderNavs.concat(headerNavs);
		}
	}
	
})();