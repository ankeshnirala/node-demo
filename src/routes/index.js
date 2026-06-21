const router = require("express").Router();
const controller = require("../controllers/pgRegistrationController");
const pgPostRequestBodyValidator = require("../middleware/requestValidator.js");


router.post("/pg/registration",pgPostRequestBodyValidator,controller.pgRegistrationController);
router.get("/pg/registration", controller.pgListAllController);
router.get("/pg/registration/:id", controller.pgfinddbyid);
router.post("/pg/deletion/:id",controller.pgfinddeletebyid)
router.put("/pg/update/:id",controller.updatePgById)

module.exports = router;
console.log('changes applied');
