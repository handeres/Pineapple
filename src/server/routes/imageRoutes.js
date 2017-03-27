var express = require('express');
var router = express.Router();
var images = require('../controller/imageController');

router.post("/create/", images.create);
router.get("/deleteAll/", images.deleteAll);
router.post("/update/:id/", images.update);
router.get("/delete/:id/", images.delete);
router.get("/all/", images.getAll);
router.get("/:id/", images.getById);


module.exports = router;