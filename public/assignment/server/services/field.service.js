module.exports = function(appServer, FormModel) {
	
	appServer.get("/api/assignment/form/:formId/field", function(req, res) {
		var formId = req.params.formId;
		FormModel.findById(formId).then(function(form) {
			res.json(form.fields);
		});
	})
	
	appServer.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		getFieldByFormIdAndFieldId(formId, fieldId).then(function(field) {
			res.json(field);
		});
	})
	
	appServer.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		FormModel.removeField(formId, fieldId).then(function(fields) {
			res.json(fields);
		});
	})
	
	appServer.post("/api/assignment/form/:formId/field", function(req, res) {
		var formId = req.params.formId;
		var field = req.body;
		FormModel.insertField(formId, field).then(function(form) {
			res.json(form);
		});
	})
	
	appServer.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		var field = req.body;
		FormModel.updateField(formId, fieldId, field).then(function(form) {
			res.json(form);
		});
	})
	
	// String * String -> Promise(Field)
	function getFieldByFormIdAndFieldId(formId, fieldId) {
		var promise = FormModel.findById(formId).then(function(form) {
			var deferred = Q.defer();
			var field = form.fields.find(function(currentField, index, array) {
				return currentField._id == fieldId;
			});
			deferred.resolve(field);
			return deferred.promise;
		});
		
		return promise;
	}
}