var express = require('express');
var router = express.Router();
var members = require('../controller/memberController');

router.post("/create/", members.create);
router.post("/update/:id/", members.update);
router.get("/delete/:id/", members.delete);
router.get("/deleteAll/", members.deleteAll);
router.get("/all/", members.getAll);
router.get("/parentOrOrganisation/", members.getByParentOrOrganisation);
router.get("/forDetail/:id/", members.getByIdForDetail);
router.get("/:id/", members.getById);
router.get("/parent/:id", members.getByParent);
router.get("/parentGroup/:id", members.getParentGroups);
router.get("/group/:id", members.getByGroup);
router.get("/organisation/:id", members.getByOrganisation);


module.exports = router;