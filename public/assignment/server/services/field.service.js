var uuid = require('uuid');

module.exports = function(appServer, formsModel) {
	
	appServer.get("/api/assignment/form/:formId/field", function(req, res) {
		var formId = req.params.formId;
		var form = formsModel.findById(formId);
		
		res.json(form.fields);
	})
	
	appServer.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		var field = getFieldByFormIdAndFieldId(formId, fieldId);
		
		res.json(field);
	})
	
	appServer.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		var fields = formsModel.removeField(formId, fieldId);
		
		res.json(fields);
	})
	
	appServer.post("/api/assignment/form/:formId/field", function(req, res) {
		var formId = req.params.formId;
		var field = req.body;
		var updatedForm = insertField(formId, field);
		
		res.json(updatedForm);
	})
	
	appServer.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		var field = req.body;
		var updatedForm = formsModel.updateField(formId, fieldId, field);
		
		res.json(updatedForm);
	})
	
	function getFieldByFormIdAndFieldId(formId, fieldId) {
		var form = formsModel.findById(formId);
		var field = form.fields.find(function(currentField, index, array) {
			return currentField.id == fieldId;
		});
		
		return field;
	}
	
	function insertField(formId, field) {
		field.id = uuid.v1();
		var updatedForm = formsModel.insertField(formId, field);
		
		return updatedForm;
	}
}