(function() {
	"use strict"
	
	angular.module("FormBuilderApp").factory("FieldService", fieldService);
	
	function fieldService($http) {
		
		var api = {
		createFieldForForm: createFieldForForm,
		getFieldsForForm: getFieldsForForm,
		getFieldForForm: getFieldForForm,
		deleteFieldFromForm: deleteFieldFromForm,
		updateField: updateField
		};
	
		function createFieldForForm(formId, field) {
			var url = "/api/assignment/form/" + formId + "/field";
			return $http.post(url, field);
		}
		
		function getFieldsForForm(formId) {
			var url = "/api/assignment/form/" + formId + "/field";
			return $http.get(url);
		}
		
		function getFieldForForm(formId, fieldId) {
			var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
			return $http.get(url);
		}
		
		function deleteFieldFromForm(formId, fieldId) {
			var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
			return $http.delete(url);
		}
		
		function updateField(formId, fieldId, field) {
			var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
			return $http.put(url, field);
		}
		
		return api;
	}
		
})();