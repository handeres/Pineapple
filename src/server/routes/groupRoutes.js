var express = require('express');
var router = express.Router();
var groups = require('../controller/groupController');

router.post("/create/", groups.create);
router.post("/update/:id/", groups.update);
router.get("/overview/", groups.getForOverview);
router.get("/addMember/:id/", groups.addMember);
router.get("/removeMember/:id/", groups.removeMember);
router.get("/getMembers/", groups.getMembers);
router.get("/deleteAll/", groups.deleteAll);
router.get("/delete/:id/", groups.delete);
router.get("/organisation/", groups.getByOrganisationId);
router.get("/namesOrganisation/", groups.getNamesByOrganisationId);
router.get("/all/", groups.getAll);
router.get("/:id/", groups.getById);



module.exports = router;