(function() {
	"use strict"
	
	angular.module("FormBuilderApp").config(function($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "views/home/home.view.html"
			})
			.when("/profile", {
				templateUrl: "views/profile/profile.view.html",
				controller: "ProfileController"
			})
			.when("/admin", {
				templateUrl: "views/admin/admin.view.html"
			})
			.when("/forms", {
				templateUrl: "views/form/form.view.html",
				controller: "FormController"
			})
			.when("/register", {
				templateUrl: "views/register/register.view.html",
				controller: "RegisterController"
			})
			.when("/login", {
				templateUrl: "views/login/login.view.html",
				controller: "LoginController"
			})
			.otherwise({
				redirectTo: "/home"
			});
	});
	
})();