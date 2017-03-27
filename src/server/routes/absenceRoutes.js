var express = require('express');
var router = express.Router();
var absences = require('../controller/absenceController.js');

router.post("/create/", absences.create);
router.get("/deleteAll/", absences.deleteAll);
router.post("/update/:id/", absences.update);
router.get("/delete/:id/", absences.delete);
router.get("/all/", absences.getAll);
router.get("/overview/", absences.getForOverview);
router.get("/member/:id", absences.getMemberOverview);
router.get("/reasons/", absences.getAllReasons);
router.get("/:id/", absences.getById);


module.exports = router;