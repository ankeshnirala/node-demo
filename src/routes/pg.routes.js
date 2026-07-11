const express = require('express');
const { ensureAuthenticated, restrictRole } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate');
const { createPgSchema, updatePgSchema } = require('../validator/pgvalidator');
const { createPg, getMyPgs, updatePg, deletePg } = require('../controllers/pg.controller');

const router = express.Router();

router.use(ensureAuthenticated);
router.use(restrictRole('OWNER'));

router.post('/', validate(createPgSchema), createPg);
router.get('/', getMyPgs);
router.patch('/:id', validate(updatePgSchema), updatePg);
router.delete('/:id', deletePg);

module.exports = router;
