/**
 * Created by Hannes on 15.01.2017.
 */
var express = require('express');
var router = express.Router();
var users = require('../controller/userController.js');

router.get("", users.use);

module.exports = router;