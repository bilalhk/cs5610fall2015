(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("FormController", formController);
	
	function formController($scope, $rootScope, FormService) {
		
		var loggedInUser = $rootScope.user;
		FormService.findAllFormsForUser(loggedInUser.id, findAllFormsCallback);
		
		$scope.addForm = function() {
			var newForm = {name: $scope.newFormName};
			FormService.createFormForUser(loggedInUser.id, newForm, createFormCallback);
		}
		
		$scope.updateForm = function() {
			// ??????
		}
		
		$scope.deleteForm = function(index) {
			var selectedForm = $scope.forms[index];
			FormService.deleteFormById(selectedForm.id, deleteFormCallback);
		}
		
		$scope.selectForm = function(index) {
			// ???????
		}
		
		function deleteFormCallback(currentForms) {
			$scope.forms = currentForms;
		}
		
		function createFormCallback(newForm) {
			$scope.forms.push(newForm);
		}
		
		function findAllFormsCallback(forms) {
			$scope.forms = forms;
		}
	}
	
})();