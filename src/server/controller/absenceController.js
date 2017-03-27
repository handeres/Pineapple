var absenceStore = require("../services/absenceStore.js");

module.exports.create = function(req, res) {
	/* Wenn neu */
	if (undefined == req.body._id) {
		absenceStore.create(req.headers.organisationid,
			req.headers.userid,
			req.headers.parentid,
			req.body.memberId,
			req.body.fromDate,
			req.body.untilDate,
			req.body.reason,
			req.body.otherReason,
			req.body.hasOtherReason,
			function (err, child) {
				res.json(child);
			});
	} else {
		module.exports.update(req, res);
	}
};


module.exports.getForOverview = function(req, res){
	absenceStore.getForOverview(req.headers.role, req.headers.parentid, req.headers.organisationid,function(err, docs) {
		res.json(docs);
	});
};

module.exports.getMemberOverview = function(req, res){
	absenceStore.getMemberOverview(req.params.id,function(err, docs) {
		res.json(docs);
	});
};

module.exports.register = function(req, res){
	absenceStore.register(req.headers.organisationid,
		req.headers.parentid,
		function(err, docs) {
		res.json(docs);
	});
};

module.exports.getById = function(req, res){
	if (req.query.filter === undefined) {
		absenceStore.get(req.headers.organisationid,
			req.headers.parentid,
			req.params.id,
			function (err, docs) {
			res.json(docs);
		});
	} else if (req.query.filter === 'member') {
		module.exports.getMemberOverview(req, res);
	} else if (req.query.filter === 'parentOrOrganisation') {
		module.exports.getForOverview(req, res);
	}  else if (req.query.filter === 'register') {
		module.exports.register(req, res);
	}
};


module.exports.getAll = function(req, res){
	absenceStore.all(function(err, docs) {
		res.json(docs);
	});
};

module.exports.delete = function(req, res){
	absenceStore.delete(req.params.id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.deleteAll = function(req, res){
	absenceStore.deleteAll(function(err, docs) {
		res.json(docs);
	});
};



module.exports.update = function(req, res) {
	absenceStore.update(req.body._id,
		req.headers.userid,
		req.body.memberId,
		req.body.fromDate,
		req.body.untilDate,
		req.body.reason,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getAllReasons = function(req, res){
	absenceStore.allReasons(function(docs) {
		res.json(docs);
	});
};


