var memberStore = require("../services/memberStore.js");

module.exports.create = function(req, res) {
	if (undefined == req.body._id) {
		memberStore.create(req.body.name,
			req.body.surname,
			req.body.callingName,
			req.body.birthday,
			req.headers.organisationid,
			req.body.groupId,
			function (err, child) {
				res.json(child);
			});
	} else {
		module.exports.update(req, res);
	}
};

module.exports.getById = function(req, res) {
	if (req.query.filter === undefined) {
		memberStore.get(req.params.id, function (err, docs) {
			res.json(docs);
		});
	} else if (req.query.filter === 'parent') {
		module.exports.getByParent(req, res);
	}
	else if (req.query.filter === 'group') {
		module.exports.getByGroup(req, res);
	}
	else if (req.query.filter === 'organisation') {
		module.exports.getByOrganisation(req, res);
	}
	else if (req.query.filter === 'detail') {
		module.exports.getByIdForDetail(req, res);
	}
}

module.exports.getByIdForDetail = function(req, res){
	memberStore.getForDetail(req.headers.organisationid, req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.getParentGroups = function(req, res){
	memberStore.getParentGroups(req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.addMember = function(req, res){
	memberStore.addMember(req.params.id,
		req.body.memberId,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.removeMember = function(req, res){
	memberStore.removeMember(req.params.id,
		req.body.memberId,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getMembers = function(req, res){
	memberStore.getMembers(req.params.id,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getByGroup = function(req, res){
	memberStore.getByGroup(req.params.id,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getByOrganisation = function(req, res){
	memberStore.getByOrganisation(req.headers.organisationid,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getByParent = function(req, res){
	memberStore.getByParent(req.headers.parentid,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getByParentOrOrganisation = function(req, res){
	memberStore.getByParentOrOrganisation(req.headers.role,
		req.headers.organisationid,
		req.headers.parentid,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getAll = function(req, res){
	memberStore.all(req, function(err, docs) {
		res.json(docs);
	});
};

module.exports.delete = function(req, res){
	memberStore.delete(req.headers.organisationid, req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.deleteAll = function(req, res){
	memberStore.deleteAll(function(err, docs) {
		res.json(docs);
	});
};

module.exports.update = function(req, res) {
	memberStore.update(req.body._id,
		req.body.name,
		req.body.surname,
		req.body.callingName,
		req.body.birthday,
		req.headers.organisationid,
		req.body.groupId,
		function(err, docs) {
			res.json(docs);
		});
};


