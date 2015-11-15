(function() {
	"use strict"
	
	angular.module("FormBuilderApp").factory("FormService", formService);
	
	function formService($http) {
		
		var api = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById
		};
		
		// String * Form -> Promise([Form])
		function createFormForUser(userId, form) {
			var url = "/api/assignment/form/user/" + userId + "/form";
			return $http.post(url, form);
		}
		
		// String -> Promise([Form])
		function findAllFormsForUser(userId) {
			var url = "/api/assignment/user/" + userId + "/form";
			return $http.get(url);
		}
		
		// String -> Promise([Form])
		function deleteFormById(formId) {
			return $http.delete("/api/assignment/form/" + formId);
		}
		
		// String * Form -> Promise([Form])
		function updateFormById(formId, form) {
			var url = "/api/assignment/form/" + formId;
			return $http.put(url, form);
		}
		
		return api;
	}
	
})();