/**
 * Created by Hannes on 15.01.2017.
 */
var express = require('express');
var router = express.Router();
var users = require('../controller/userController.js');


router.post("/create/", users.create);
router.post("/hasUser/", users.hasUser);
router.post("/authenticate/", users.authenticate);
router.post("/register/", users.register);
router.get("/all/", users.all);
router.get("/deleteAll/", users.deleteAll);


module.exports = router;