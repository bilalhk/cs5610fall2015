var uuid = require('uuid');

module.exports = function(appServer, formsModel) {
	
	appServer.get("/api/assignment/form", function(req, res) {
		var forms = formsModel.findAll();
		
		res.json(forms);
	})
	
	appServer.get("/api/assignment/user/:userId/form", function(req, res) {
		var userId = req.params.userId;
		var forms = formsModel.findByUserId(userId);
		
		res.json(forms);
	})
	
	appServer.get("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		var form = formsModel.findById(formId);
		
		res.json(form);		
	})
	
	appServer.delete("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		var updatedForms = formsModel.remove(formId);
		
		res.json(updatedForms);
	})
	
	appServer.post("/api/assignment/form/user/:userId/form", function(req, res) {
		var userId = req.params.userId;
		var form = req.body;
		form.userId = userId;
		form.id = uuid.v1();
		var updatedForms = formsModel.create(form);
		
		res.json(updatedForms);
	})
	
	appServer.put("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		var form = req.body;
		var updatedForms = formsModel.update(formId, form);
		
		res.json(updatedForms);
	})
}