var express = require('express');
var router = express.Router();
var organisations = require('../controller/organisationController.js');

router.post("/create/", organisations.create);
router.post("/update/:id/", organisations.update);
router.get("/delete/:id/", organisations.delete);
router.get("/deleteAll/", organisations.deleteAll);
router.get("/all/", organisations.getAll);
router.get("/:id/", organisations.getById);

module.exports = router;