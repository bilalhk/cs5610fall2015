(function() {
	
	angular.module("FormBuilderApp").config(function($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "home/home.view.html"
			})
			.when("/profile", {
				templateUrl: "profile/profile.view.html"
			})
			.when("/admin", {
				templateUrl: "admin/admin.view.html"
			})
			.when("/forms", {
				templateUrl: "forms/forms.view.html"
			})
			.when("/register", {
				templateUrl: "register/register.view.html"
			})
			.when("/login", {
				templateUrl: "login/login.view.html"
			})
			.otherwise({
				redirectTo: "/home"
			});
	});
	
})();