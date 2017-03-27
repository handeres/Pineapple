var express = require('express');
var router = express.Router();
var adresses = require('../controller/adressController');

router.post("/create/", adresses.add);
router.post("/update/:id/", adresses.update);
router.get("/delete/:id/", adresses.delete);
router.get("/all/", adresses.getAll);
router.get("/:id/", adresses.getById);

module.exports = router;