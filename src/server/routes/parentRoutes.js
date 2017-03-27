var express = require('express');
var router = express.Router();
var parents = require('../controller/parentController');

router.post("/create/", parents.create);
router.post("/update/:id/", parents.update);
router.post("/addNewMember/:id/", parents.addNewMember);
router.get("/delete/:id/", parents.delete);
router.get("/deleteAll", parents.deleteAll);
router.get("/all/", parents.getAll);
router.get("/:id/", parents.getById);

module.exports = router;