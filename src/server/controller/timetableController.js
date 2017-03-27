/**
 * Created by Hannes on 18.03.2017.
 */

var timetableStore = require("../services/timetableStore.js");

module.exports.create = function(req, res) {
    if ('' == req.body._id || undefined == req.body._id ) {
        timetableStore.create(req.body.groupId,
            req,
            function (err, doc) {
                res.json(doc);
            });
    } else {
        module.exports.update(req, res);
    }
};

module.exports.getById = function(req, res){
    timetableStore.getByGroupId(req.params.id, function (err, docs) {
        res.json(docs);
    });
};

module.exports.getAll = function(req, res){
    timetableStore.all(function(err, docs) {
        res.json(docs);
    });
};

module.exports.delete = function(req, res){
    timetableStore.delete(req.body._id, function(err, docs) {
        res.json(docs);
    });
};

module.exports.deleteAll = function(req, res){
    timetableStore.deleteAll(function(err, docs) {
        res.json(docs);
    });
};

module.exports.update = function(req, res) {
    timetableStore.update(req.body.groupId, req, function(err, docs) {
        res.json(docs);
    });
};
