(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("FormController", formController);
	
	function formController($rootScope, $location, FormService) {
		
		var model = this;
		model.userId = $rootScope.user.Id;
		
		FormService.findAllFormsForUser(model.userId).then(populateForms);
		
		model.addForm = function() {
			var newForm = {title: model.newFormName};
			FormService.createFormForUser(model.userId, newForm).then(populateForms);
			console.log("hello");
		}
		
		model.updateForm = function() {
			// ??????
		}
		
		model.deleteForm = function(index) {
			var selectedForm = model.forms[index];
			FormService.deleteFormById(selectedForm.id).then(populateForms);
		}
		
		model.selectForm = function(index) {
			model.selectedFormId = model.forms[index].id;
			var url = "/user/" + model.userId + "/form/" + model.selectedFormId + "/fields";
			$location.url(url);
		}
		
		function populateForms(response) {
			console.log(response.data);
			var userForms = response.data.filter(function(currentForm, index, array) {
				return currentForm.userId == model.userId;
			});
			model.forms = userForms;
		}
		
		function createFormEditUrl() {
			
		}
	}
	
})();