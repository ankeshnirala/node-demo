const router = require("express").Router();
const controller = require("../controllers/pgRegistrationController");

router.post("/pg/registration", controller.pgRegistrationController());
router.get("/pg/registration", controller.pgListAllController());
router.get("/pg/registration/:id", controller.pgViewController());

module.exports = router;
