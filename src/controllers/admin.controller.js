const mongoose = require('mongoose');
const { Owner, PG, User, Booking } = require('../models/index');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
export const getUsers = asyncHandler(async (req, res) => {
  const { role, search } = req.query;

  const filter = {};

  if (role) {
    filter.role = role.toUpperCase();
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(filter)
    .select("name email phone role verified createdAt")
    .sort({ createdAt: -1 });

  res.status(200).json(users);
});
async function blockUser(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.verified = false;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: 'User blocked successfully',
      data: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ errorCode: "500", message: error.message });
  }
}

async function getPendingPgs(req, res) {
  try {
    const pgs = await PG.find({ status: 'PENDING' })
      .populate({
        path: 'owner',
        populate: { path: 'user', select: 'name email phone' },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ data: pgs });
  } catch (error) {
    return res.status(500).json({ errorCode: "500", message: error.message });
  }
}

async function reviewPgListing(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid PG id' });
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Status must be APPROVED or REJECTED' });
    }

    const pg = await PG.findById(id);

    if (!pg) {
      return res.status(404).json({ error: 'PG not found' });
    }

    pg.status = status;
    await pg.save();

    return res.status(200).json({
      message: 'PG listing reviewed successfully',
      data: pg,
    });
  } catch (error) {
    return res.status(500).json({ errorCode: "500", message: error.message });
  }
}

async function getAnalytics(req, res) {
  try {
    const [totalUsers, totalOwners, totalPgs, approvedPgs, totalBookings, pendingBookings] = await Promise.all([
      User.countDocuments({ role: 'TENANT' }),
      User.countDocuments({ role: 'OWNER' }),
      PG.countDocuments(),
      PG.countDocuments({ status: 'APPROVED' }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'PENDING' }),
    ]);

    return res.status(200).json({
      data: { totalUsers, totalOwners, totalPgs, approvedPgs, totalBookings, pendingBookings },
    });
  } catch (error) {
    return res.status(500).json({ errorCode: "500", message: error.message });
  }
}

module.exports = {
  getUsers,
  
  blockUser,
  getPendingPgs,
  reviewPgListing,
  getAnalytics,
};
