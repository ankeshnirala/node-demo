const mongoose = require('mongoose');
const { Owner, PG } = require('../models');

async function getOwnerForUser(userId) {
  return Owner.findOne({ user: userId });
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function createPg(req, res) {
  try {
    const owner = await getOwnerForUser(req.user.id);

    if (!owner) {
      return res.status(404).json({ error: 'Owner profile not found' });
    }

    const pg = await PG.create({
      ...req.body,
      owner: owner._id,
    });

    return res.status(201).json({
      message: 'PG created successfully',
      data: pg,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getMyPgs(req, res) {
  try {
    const owner = await getOwnerForUser(req.user.id);

    if (!owner) {
      return res.status(404).json({ error: 'Owner profile not found' });
    }

    const pgs = await PG.find({ owner: owner._id }).sort({ createdAt: -1 });

    return res.status(200).json({ data: pgs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updatePg(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid PG id' });
    }

    const owner = await getOwnerForUser(req.user.id);

    if (!owner) {
      return res.status(404).json({ error: 'Owner profile not found' });
    }

    const pg = await PG.findOneAndUpdate(
      { _id: id, owner: owner._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!pg) {
      return res.status(404).json({ error: 'PG not found' });
    }

    return res.status(200).json({
      message: 'PG updated successfully',
      data: pg,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deletePg(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid PG id' });
    }

    const owner = await getOwnerForUser(req.user.id);

    if (!owner) {
      return res.status(404).json({ error: 'Owner profile not found' });
    }

    const pg = await PG.findOneAndDelete({ _id: id, owner: owner._id });

    if (!pg) {
      return res.status(404).json({ error: 'PG not found' });
    }

    return res.status(200).json({
      message: 'PG deleted successfully',
      data: pg,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createPg,
  getMyPgs,
  updatePg,
  deletePg,
};
