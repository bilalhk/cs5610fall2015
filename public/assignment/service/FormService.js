(function() {
	
	angular.module("FormBuilderApp").factory("FormService", formService);
	
	function formService() {
		
		var api = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById
		};
		
		var currentForms = [];
		
		// String * Form * (Form -> any) -> undefined
		function createFormForUser(userId, form, callback) {
			var newForm = $.extend(true, {}, form);
			newForm.id = guid();
			newForm.userId = userId;
			currentForms.push(newForm);
			callback(newForm);
		}
		
		// String * ([Form] -> any) -> undefined
		function findAllFormsForUser(userId, callback) {
			var userForms = currentForms.filter(function(currentForm) {
				return currentForm.userId == userId;
			});
			
			callback(userForms);
		}
		
		// String * ([Form] -> any) -> undefined
		function deleteFormById(formId, callback) {
			currentForms = currentForms.filter(function(currentForm) {
				return currentForm.id != formId;
			});
			
			callback(currentForms);
		}
		
		// String * Form * (Form -> any) -> undefined
		function updateFormById(formId, newForm, callback) {
			currentForms = currentForms.map(function(currentForm) {
				return currentForm.id == formId ? newForm : currentForm;
			});
			
			callback(currentForms);
		}
		
		return api;
	}
	
})();