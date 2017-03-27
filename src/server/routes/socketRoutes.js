/**
 * Created by Hannes on 15.01.2017.
 */
var express = require('express');
var router = express.Router();
var sockets = require('../controller/socketController');

router.get("/deleteAll/", sockets.deleteAll);
router.get("/all/", sockets.getAll);

module.exports = router;