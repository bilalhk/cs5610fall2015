var forms = require('./form.mock.json')

module.exports = function() {
	
	var api = {
		create: create,
		findAll: findAll,
		findById: findById,
		findByUserId: findByUserId,
		findFormByTitle: findFormByTitle,
		update: update,
		updateField: updateField,
		insertField: insertField,
		remove: remove,
		removeField: removeField
	};
	
	// Form -> [Form]
	function create(form) {
		forms.push(form);
		return forms;
	}
	
	// -> [Form]
	function findAll() {
		return forms;
	}
	
	// Number -> Form
	function findById(id) {
		var form = forms.find(function(currentForm, index, array) {
			return currentForm.id == id;
		});
		
		return form != undefined ? form : null;
	}
	
	// Number -> [Form]
	function findByUserId(userId) {
		var userForms = forms.filter(function(currentForm, index, array) {
			return currentForm.userId == userId;
		});
		
		return userForms;
	}
	
	// String -> Form
	function findFormByTitle(title) {
		var form = forms.find(function(currentForm, index, array) {
			return currentForm.title == title;
		});
		
		return form != undefined ? form : null;
	}
	
	// Number * Form -> [Form]
	function update(id, form) {
		var outdatedForm = forms.find(function(currentForm, index, array) {
			return currentForm.id == id;
		});
		
		outdatedForm = form;
	}
	
	// Number * Number * Field -> Form
	function updateField(formId, fieldId, field) {
		var form = forms.find(function(currentForm, index, array) {
			return currentForm.id == formId;
		});
		var oldField = form.fields.find(function(currentField, index, array) {
			return currentField.id == fieldId;
		});
		oldField = field;
		
		return form;
	}
	
	// Number * Field -> Form
	function insertField(formId, field) {
		var form = forms.find(function(currentForm, index, array) {
			return currentForm.id == formId;
		});
		form.fields.push(field);
		
		return form;
	}
	
	// Number -> [Form]
	function remove(id) {
		forms = forms.filter(function(currentForm, index, array) {
			return currentForm.id != id;
		});
		
		return forms;
	}
	
	// Number * Number -> [Field]
	function removeField(formId, fieldId) {
		var form = forms.find(function(currentForm, index, array) {
			return currentForm.id == formId;
		});
		form.fields = form.fields.filter(function(currentField, index, array) {
			return currentField.id != fieldId;
		});
		
		return form.fields;
	}
	
	return api;
}