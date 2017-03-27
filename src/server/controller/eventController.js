var eventStore = require("../services/eventStore.js");

module.exports.create = function(req, res) {
	/* Wenn neu */
	if (undefined == req.body._id) {
		eventStore.create(
			req.body.title,
			req.body.description,
			req.body.from,
			req.body.timeFrom,
			req.body.to,
			req.body.timeTo,
			req.headers.organisationid,
            req.headers.userid,
			function (err, child) {
				res.json(child);
			});
	}
	else {
		module.exports.update(req, res);
	}
};

module.exports.getById = function(req, res){
	eventStore.get(req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.getAll = function(req, res){
	eventStore.all(function(err, docs) {
		res.json(docs);
	});
};

module.exports.delete = function(req, res){
	eventStore.delete(req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.deleteAll = function(req, res){
	eventStore.deleteAll(function(err, docs) {
		res.json(docs);
	});
};

module.exports.update = function(req, res) {
	eventStore.update(
		req.body._id,
		req.body.title,
		req.body.description,
		req.body.from,
		req.body.timeFrom,
		req.body.to,
		req.body.timeTo,
		req.headers.organisationid,
		function(err, docs) {
			res.json(docs);
		});
};
