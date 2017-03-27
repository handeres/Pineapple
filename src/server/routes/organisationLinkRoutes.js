/**
 * Created by Hannes on 15.01.2017.
 */
var express = require('express');
var router = express.Router();
var organisationLinks = require('../controller/organisationlinkController');

router.get("/deleteAll/", organisationLinks.deleteAll);
router.get("/all/", organisationLinks.getAll);

module.exports = router;