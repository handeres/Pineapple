/**
 * Created by Hannes on 15.01.2017.
 */
var userStore = require("../services/userStore.js");

module.exports.use = function(req, res, next) {
    userStore.use(req, res,
        function(err, resp) {
            if (err) {
                res.json(resp);
            } else {
                if(resp.success) {
                    next();
                } else {
                    res.json(resp);
                }
            }
        });
};

module.exports.hasUser = function(req, res) {
    userStore.hasUser(req.body.email,
        function(err, resp) {
            res.json(resp);
        });
};

module.exports.create = function(req, res) {
    userStore.create(req.body.email, req.body.contractId, req.body.password, req.body.password2, req.body.recaptchaResponse,
        function(err, resp) {
            res.json(resp);
        });
};

module.exports.register = function(req, res) {
    userStore.register(req.body.email, req.body.contractId, req.body.password, req.body.password2,
        function(err, resp) {
            res.json(resp);
        });
};

module.exports.authenticate = function(req, res) {
    userStore.authenticate(req.body.name, req.body.password,
        function(err, resp) {
            res.json(resp);
        });
};


module.exports.all = function(req, res) {
    userStore.all(function(err, resp) {
            res.json(resp);
        });
};

module.exports.deleteAll = function(req, res) {
    userStore.deleteAll(function(err, resp) {
        res.json(resp);
    });
};