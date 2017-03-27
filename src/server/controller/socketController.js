/**
 * Created by Hannes on 06.03.2017.
 */
var socketStore = require("../services/socketStore");

module.exports.deleteAll = function(req, res){
    socketStore.deleteAll(function(err, docs) {
        res.json(docs);
    });
};

module.exports.getAll = function(req, res){
    socketStore.all(function(err, docs) {
        res.json(docs);
    });
};