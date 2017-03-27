var groupStore = require("../services/groupStore.js");

module.exports.create = function(req, res) {
	if (undefined == req.body._id) {
		groupStore.create(req.body.name,
			req.body.level,
			req.headers.organisationid,
			function (err, doc) {
				res.json(doc);
			});
	} else {
		module.exports.update(req, res);
	}
};

module.exports.getById = function(req, res){
	if (req.query.filter === undefined) {
		groupStore.get(req.params.id, function (err, docs) {
			res.json(docs);
		});
	} else if (req.query.filter === 'parent') {
		module.exports.getForOverview(req, res);
	} else if (req.query.filter === 'organisation') {
		module.exports.getForOverview(req, res);
	}
};

module.exports.addMember = function(req, res){
	groupStore.addMember(req.params.id,
		req.body.memberId,
		function(err, docs) {
		res.json(docs);
	});
};

module.exports.removeMember = function(req, res){
	groupStore.removeMember(req.params.id,
		req.body.memberId,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getMembers = function(req, res){
	groupStore.getMembers(req.params.id,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getAll = function(req, res){
	groupStore.all(function(err, docs) {
		res.json(docs);
	});
};

module.exports.getForOverview = function(req, res){
	groupStore.getForOverview(req.headers.role, req.headers.parentid, req.headers.organisationid,function(err, docs) {
		res.json(docs);
	});
};

module.exports.getByOrganisationId = function(req, res){
	groupStore.getByOrganisationId(req.headers.organisationid, function(err, docs) {
		res.json(docs);
	});
};

module.exports.getNamesByOrganisationId = function(req, res){
	groupStore.getNamesByOrganisationId(req.headers.organisationid, function(err, docs) {
		res.json(docs);
	});
};

module.exports.delete = function(req, res){
	groupStore.delete(req.headers.organisationid, req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.deleteAll = function(req, res){
	groupStore.deleteAll(function(err, docs) {
		res.json(docs);
	});
};

module.exports.update = function(req, res) {
	groupStore.update(req.body._id,
		req.body.name,
		req.body.level,
		function(err, docs) {
			res.json(docs);
		});
};


