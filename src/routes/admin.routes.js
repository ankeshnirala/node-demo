const express = require('express');
const { ensureAuthenticated, restrictRole } = require('../middleware/authMiddleware');
const {
  getUsers,
  blockUser,
  getPendingPgs,
  reviewPgListing,
  getAnalytics,
} = require('../controllers/admin.controller');

const router = express.Router();

router.use(ensureAuthenticated);
router.use(restrictRole('ADMIN'));

router.get('/users',)
router.patch('/users/:id/block', blockUser);
router.get('/pgs/pending', getPendingPgs);
router.patch('/pgs/:id/review', reviewPgListing);
router.get('/analytics', getAnalytics);

module.exports = router;
