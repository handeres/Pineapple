var organisationStore = require("../services/organisationStore.js");

module.exports.create = function(req, res) {
	if (undefined == req.body._id) {
		organisationStore.create(req.body.name,
			req.body.adress.name,
			req.body.adress.surname,
			req.body.adress.street,
			req.body.adress.number,
			req.body.adress.zipCode,
			req.body.adress.city,
			req.body.adress.email,
			req.body.adress.phone,
			req.body.adress.mobile,
			function (err, child) {
				res.json(child);
			});
	} else {
		module.exports.update(req, res);
	}
};

module.exports.getById = function(req, res){
	organisationStore.get(req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.getAll = function(req, res){
	organisationStore.all(function(err, docs) {
		res.json(docs);
	});
};

module.exports.delete = function(req, res){
	organisationStore.delete(req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.deleteAll = function(req, res){
	organisationStore.deleteAll( function(err, docs) {
		res.json(docs);
	});
};

module.exports.update = function(req, res) {
	organisationStore.update(req.body._id,
		req.body.name,
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



