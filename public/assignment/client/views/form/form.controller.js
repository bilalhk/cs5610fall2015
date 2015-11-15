(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("FormController", formController);
	
	function formController($scope, $rootScope, FormService) {
		
		var loggedInUser = $rootScope.user;
		
		FormService.findAllFormsForUser(loggedInUser.id).then(populateForms);
		
		$scope.addForm = function() {
			var newForm = {name: $scope.newFormName};
			FormService.createFormForUser(loggedInUser.id, newForm).then(populateForms);
		}
		
		$scope.updateForm = function() {
			// ??????
		}
		
		$scope.deleteForm = function(index) {
			var selectedForm = $scope.forms[index];
			FormService.deleteFormById(selectedForm.id).then(populateForms);
		}
		
		$scope.selectForm = function(index) {
			// ???????
		}
		
		function populateForms(response) {
			var userForms = response.data.filter(function(currentForm, index, array) {
				return currentForm.userId == loggedInUser.id;
			});
			$scope.forms = userForms;
		}
	}
	
})();