(function() {
	"use strict"
	
	angular.module("FormBuilderApp").config(function($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "views/home/home.view.html"
			})
			.when("/profile", {
				templateUrl: "views/profile/profile.view.html",
				controller: "ProfileController",
				controllerAs: "model"
			})
			.when("/admin", {
				templateUrl: "views/admin/admin.view.html"
			})
			.when("/forms", {
				templateUrl: "views/form/form.view.html",
				controller: "FormController",
				controllerAs: "model"
			})
			.when("/user/:userId/form/:formId/fields", {
				templateUrl: "views/field/field.view.html",
				controller: "FieldController",
				controllerAs: "model"
			})
			.when("/register", {
				templateUrl: "views/register/register.view.html",
				controller: "RegisterController",
				controllerAs: "model"
			})
			.when("/login", {
				templateUrl: "views/login/login.view.html",
				controller: "LoginController",
				controllerAs: "model"
			})
			.otherwise({
				redirectTo: "/home"
			});
	});
	
})();