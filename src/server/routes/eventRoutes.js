var express = require('express');
var router = express.Router();
var events = require('../controller/eventController.js');

router.post("/create/", events.create);
router.get("/deleteAll/", events.deleteAll);
router.post("/update/:id/", events.update);
router.get("/delete/:id/", events.delete);
router.get("/all/", events.getAll);
router.get("/:id/", events.getById);

module.exports = router;