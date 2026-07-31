const fs = require('fs');
const path = require('path');
const Profile = require('../models/Profile');

// Deletes a file from the uploads folder, ignoring errors if it's already gone
const deleteUploadedFile = (avatarUrl) => {
  if (!avatarUrl) return;
  const filePath = path.join(__dirname, '..', avatarUrl); // avatarUrl is like "/uploads/avatar-123.jpg"
  fs.unlink(filePath, (err) => {
    if (err && err.code !== 'ENOENT') console.error('Failed to delete old avatar:', err);
  });
};

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

// POST /profiles  (multipart/form-data — upload.single('avatar') runs first)
const create = async (req, res, next) => {
  try {
    const { name, email, jobTitle, phone, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const avatarUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newProfile = await Profile.create({ name, email, jobTitle, phone, bio, avatarUrl });
    res.status(201).json(newProfile);
  } catch (err) {
    next(err);
  }
};

// PUT /profiles/:id  (multipart/form-data — upload.single('avatar') runs first)
const update = async (req, res, next) => {
  try {
    const existing = await Profile.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Profile not found' });

    const updateData = { ...req.body };

    // Only touch avatarUrl if a new file was actually uploaded
    if (req.file) {
      deleteUploadedFile(existing.avatarUrl); // remove the old image from disk
      updateData.avatarUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Profile.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });
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
    deleteUploadedFile(deleted.avatarUrl); // clean up the image file too
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove };
