const Profile = require('../models/Profile');

// GET /profiles
const getAll = async (req, res, next) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};

// GET /profiles/:id
const getOne = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

// POST /profiles
const create = async (req, res, next) => {
  try {
    const { name, email, jobTitle, phone, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const newProfile = await Profile.create({ name, email, jobTitle, phone, bio });
    res.status(201).json(newProfile);
  } catch (err) {
    next(err);
  }
};

// PUT /profiles/:id
const update = async (req, res, next) => {
  try {
    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Profile not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /profiles/:id
const remove = async (req, res, next) => {
  try {
    const deleted = await Profile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Profile not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove };
