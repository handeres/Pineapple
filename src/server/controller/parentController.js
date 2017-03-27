var parentStore = require("../services/parentStore.js");

module.exports.create = function(req, res) {
	if (undefined == req.body._id) {
		parentStore.create(req.headers.userid,
			req.body.adress.name,
			req.body.adress.surname,
			req.body.adress.street,
			req.body.adress.number,
			req.body.adress.zipCode,
			req.body.adress.city,
			req.body.adress.email,
			req.body.adress.phone,
			req.body.adress.mobile,
			req.body.contractId,
			function (err, child) {
				res.json(child);
			});
	} else {
		module.exports.update(req, res);
	}
};

module.exports.addNewMember = function(req, res){
	parentStore.addNewMember(req.params.id, req.body.contractId, function(err, docs) {
		res.json(docs);
	});
};

module.exports.getById = function(req, res){
	parentStore.get(req.params.id, function(err, docs) {
		res.json(docs);
	});
};


module.exports.getAll = function(req, res){
	parentStore.all(function(err, docs) {
		res.json(docs);
	});
};

module.exports.delete = function(req, res){
	parentStore.delete(req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.deleteAll = function(req, res){
	parentStore.deleteAll(function(err, docs) {
		res.json(docs);
	});
};

module.exports.update = function(req, res) {
	parentStore.update(req.body._id,
		req.body.adress.name,
		req.body.adress.surname,
		req.body.adress.street,
		req.body.adress.number,
		req.body.adress.zipCode,
		req.body.adress.city,
		req.body.adress.email,
		req.body.adress.phone,
		req.body.adress.mobile,
		function(err, docs) {
			res.json(docs);
		});
};


