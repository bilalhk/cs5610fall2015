(function() {
	"use strict"
	
	angular.module("FormBuilderApp").controller("FieldController", fieldController);
	
	function fieldController($routeParams, FieldService) {
		
		var model = this;
		
		var formId = $routeParams.formId;
		
		FieldService.getFieldsForForm(formId).then(populateFields);
		
		model.availableFieldTypes = [
			"Single Line Text",
			"Multi Line Text",
			"Date",
			"Dropdown",
			"Checkboxes",
			"Radio Buttons",
			"Email"
		];
		
		function populateFields(response) {
			model.fields = response.data;
		}
		
		model.addField = function() {
			var field;
			switch (model.fieldType) {
				case "Single Line Text": 
					field = createEmptyText();
					break;
				case "Multi Line Text": 
					field = createEmptyTextArea();
					break;
				case "Date":
					field = createEmptyDate();
					break;
				case "Dropdown":
					field = createEmptyDropdown();
					break;
				case "Checkboxes":
					field = createEmptyCheckboxes();
					break;
				case "Radio Buttons": 
					field = createEmptyRadio();
					break;
				case "Email":
					field = createEmptyEmail();
					break;
			};
			FieldService.createFieldForForm(formId, field).then(populateFields);
		}
		
		model.removeField = function(fieldIndex) {
			var fieldId = model.fields[fieldIndex].id;
			FieldService.deleteFieldFromForm(formId, fieldId).then(populateFields);
		}
		
		function createEmptyText() {
			return {"id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
		}
		
		function createEmptyTextArea() {
			return {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
		}
		
		function createEmptyDate() {
			return {"id": null, "label": "New Date Field", "type": "DATE"};
		}
		
		function createEmptyDropdown() {
			return {"id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
        				{"label": "Option 1", "value": "OPTION_1"},
        				{"label": "Option 2", "value": "OPTION_2"},
        				{"label": "Option 3", "value": "OPTION_3"}
					]};
		}
		
		function createEmptyCheckboxes() {
			return {"id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
						{"label": "Option A", "value": "OPTION_A"},
						{"label": "Option B", "value": "OPTION_B"},
						{"label": "Option C", "value": "OPTION_C"}
					]};
		}
		
		function createEmptyRadio() {
			return {"id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
						{"label": "Option X", "value": "OPTION_X"},
						{"label": "Option Y", "value": "OPTION_Y"},
						{"label": "Option Z", "value": "OPTION_Z"}
					]};
		}
		
		function createEmptyEmail() {
			return {"id": null, "label": "New Email Field", "type": "EMAIL", "placeholder": "New Field"};
		}
	}
	
})();