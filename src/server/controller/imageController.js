/**
 * Created by Hannes on 18.03.2017.
 */

var imageStore = require("../services/imageStore.js");

module.exports.create = function(req, res) {
    imageStore.create(req.headers.organisationid,
        req.body.id,
        req.body.picture,
        function (err, doc) {
            res.json(doc);
        });
};

module.exports.getById = function(req, res){
    imageStore.get(req.params.id, function (err, docs) {
        res.json(docs);
    });
};

module.exports.getAll = function(req, res){
    if (req.query.filter === undefined) {
        imageStore.all(function(err, docs) {
            res.json(docs);
        });
    } else if (req.query.filter === 'organisation') {
        imageStore.getByOrganisation(req.headers.organisationid,
            function(err, docs) {
            res.json(docs);
        });
    }
};

module.exports.delete = function(req, res){
    imageStore.delete(req.headers.organisationid, req.params.id, function(err, docs) {
        res.json(docs);
    });
};

module.exports.deleteAll = function(req, res){
    imageStore.deleteAll(function(err, docs) {
        res.json(docs);
    });
};

module.exports.update = function(req, res) {
    imageStore.update(req.body._id,
        req.body.picture,
        function(err, docs) {
            res.json(docs);
        });
};
