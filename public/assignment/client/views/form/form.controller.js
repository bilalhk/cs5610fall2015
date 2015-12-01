(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("FormController", formController);
	
	function formController($rootScope, $location, FormService) {
		
		var model = this;
		model.userId = $rootScope.user._id;
		
		FormService.findAllFormsForUser(model.userId).then(populateForms);
		
		model.addForm = function() {
			var newForm = {title: model.newFormName};
			FormService.createFormForUser(model.userId, newForm).then(populateForms);
		}
		
		model.updateForm = function() {
			// ??????
		}
		
		model.deleteForm = function(index) {
			var selectedForm = model.forms[index];
			FormService.deleteFormById(selectedForm.id).then(populateForms);
		}
		
		model.selectForm = function(index) {
			model.selectedFormId = model.forms[index]._id;
			var url = "/user/" + model.userId + "/form/" + model.selectedFormId + "/fields";
			$location.url(url);
		}
		
		function populateForms(response) {
			var userForms = response.data.filter(function(currentForm, index, array) {
				return currentForm.userId == model.userId;
			});
			model.forms = userForms;
		}
		
	}
	
})();