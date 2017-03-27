/**
 * Created by Hannes on 13.03.2017.
 */
var organisationLinkStore = require("../services/organisationLinkStore.js");

module.exports.getAll = function(req, res){
    organisationLinkStore.all(function(err, docs) {
        res.json(docs);
    });
};

module.exports.deleteAll = function(req, res){
    organisationLinkStore.deleteAll(function(err, docs) {
        res.json(docs);
    });
};