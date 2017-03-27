var adressStore = require("../services/adressStore");

module.exports.add= function(req, res) {
	adressStore.add(req.body.adress.name,
		req.body.surname,
		req.body.street,
		req.body.number,
		req.body.zipCode,
		req.body.city,
		req.body.email,
		req.body.phone,
		req.body.mobile,
		function(err, docs) {
			res.json(docs);
		});
};

module.exports.getById = function(req, res){
	adressStore.get(req.params._id, function(err, docs) {
        res.json(docs);
    });
};

module.exports.getAll = function(req, res){
	adressStore.all(function(err, docs) {
        res.json(docs);
    });
};

module.exports.delete = function(req, res){
	adressStore.delete(req.body._id, function(err, docs) {
		res.json(docs);
	});
};

module.exports.update = function (req, res) {
	adressStore.update(req.params.id,
		req.body.adress.name,
		req.body.surname,
		req.body.street,
		req.body.number,
		req.body.zipCode,
		req.body.city,
		req.body.email,
		req.body.phone,
		req.body.mobile,
		function(err, docs) {
			res.json(docs);
    });
};
