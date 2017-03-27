var express = require('express');
var router = express.Router();
var timetable = require('../controller/timetableController');

router.post("/create/", timetable.create);
router.get("/deleteAll/", timetable.deleteAll);
router.post("/update/:id/", timetable.update);
router.get("/delete/:id/", timetable.delete);
router.get("/all/", timetable.getAll);
router.get("/:id/", timetable.getById);


module.exports = router;