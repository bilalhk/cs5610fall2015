module.exports = function(appServer, FormModel) {
	
	appServer.get("/api/assignment/form", function(req, res) {
		FormModel.findAll().then(function(forms) {
			res.json(forms);
		});
	})
	
	appServer.get("/api/assignment/user/:userId/form", function(req, res) {
		var userId = req.params.userId;
		FormModel.findByUserId(userId).then(function(forms) {
			res.json(forms);
		});
	})
	
	appServer.get("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		FormModel.findById(formId).then(function(form) {
			res.json(form);
		});		
	})
	
	appServer.delete("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		FormModel.remove(formId).then(function(forms) {
			res.json(forms);
		});
	})
	
	appServer.post("/api/assignment/form/user/:userId/form", function(req, res) {
		var userId = req.params.userId;
		var form = req.body;
		form.userId = userId;
		FormModel.create(form).then(function(forms) {
			res.json(forms);
		});
	})
	
	appServer.put("/api/assignment/form/:formId", function(req, res) {
		var formId = req.params.formId;
		var form = req.body;
		FormModel.update(formId, form).then(function(forms) {
			res.json(forms);
		});
	})
}