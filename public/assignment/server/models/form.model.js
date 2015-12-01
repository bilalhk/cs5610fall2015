var forms = require('./form.mock.json')

module.exports = function(mongoose) {
	var formSchema = require('./form.schema.js')(mongoose);
	var Q = require('q');
	
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
	
	var FormModel = mongoose.model("FormModel", formSchema);
	
	// Form -> Promise([Form])
	function create(form) {
		var promise = FormModel.create(form).then(function(form) {
			return findAll();
		})
		
		return promise;
	}
	
	// -> Promise([Form])
	function findAll() {
		var deferred = Q.defer();
		FormModel.find(function(err, results) {
			deferred.resolve(results);
		})
		
		return deferred.promise;
	}
	
	// String -> Promise(Form)
	function findById(id) {
		var deferred = Q.defer();
		FormModel.findById(id, function(err, result) {
			deferred.resolve(result);
		});
		
		return deferred.promise;		
	}
	
	// String -> Promise([Form])
	function findByUserId(userId) {
		var deferred = Q.defer();
		var conditions = {userId: userId};
		FormModel.find(conditions, function(err, results) {
			deferred.resolve(results);
		})
		
		return deferred.promise;
	}
	
	// String -> Promise([Form])
	function findFormByTitle(title) {
		var deferred = Q.defer();
		var conditions = {title: title};
		FormModel.find(conditions, function(err, results) {
			deferred.resolve(results);
		})
		
		return deferred.promise;
	}
	
	// String * Form -> Promise([Form])
	function update(id, form) {
		var deferred = Q.defer();
		var conditions = {_id: id};
		var update = {$set: form};
		FormModel.update(conditions, update, function(err, raw) {
			deferred.resolve();
		});
		var promise = deferred.promise.then(function() {
			return findAll();
		});
		
		return promise;
	}
	
	// String * String * Field -> Promise(Form)
	function updateField(formId, fieldId, field) {
		var deferred = Q.defer();
		
		FormModel.findById(formId, function(err, retrievedForm) {
			var fieldIndex = retrievedForm.fields.findIndex(function(field, index, array) {
				return field._id == fieldId;
			});
			Object.assign(retrievedForm.fields[fieldIndex], field);
			deferred.resolve(retrievedForm);
		});
		
		var promise = deferred.promise
			.then(function(retrievedForm) {
				var deferred = Q.defer();
				retrievedForm.save(function(err) {
					deferred.resolve();
				});
				return deferred.promise;
			})
			.then(function() {
				return findById(formId);
			});
			
		return promise;
	}
	
	// String * Field -> Promise([Field])
	function insertField(formId, field) {		
		var promise = findById(formId)
			.then(function(form) {
				var deferred = Q.defer();
				form.fields.push(field);
				form.save(function(err) {
					deferred.resolve(form.fields);
				});
				return deferred.promise;
			});
			
		return promise;
	}
	
	// String -> Promise([Form])
	function remove(id) {
		var deferred = Q.defer();
		var conditions = {_id: id};
		FormModel.remove(conditions, function(err) {
			findAll.then(function(forms) {
				deferred.resolve(forms);
			});
		});
		
		return deferred.promise;
	}
	
	// String * String -> Promise([Field])
	function removeField(formId, fieldId) {
		var promise = findById(formId)
			.then(function(form) {
				var deferred = Q.defer()
				var fields = form.fields.filter(function(field, index, array) {
					return fieldId != field._id;
				});
				form.fields = fields;
				form.save(function(err) {
					deferred.resolve();
				});
				return deferred.promise;
			})
			.then(function() {
				return findAll();
			});
		
		return promise;
	}
	
	return api;
}