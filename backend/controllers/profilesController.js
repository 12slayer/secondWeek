const fs = require('fs');
const path = require('path');
const prisma = require('../lib/prisma');

// Deletes a file from the uploads folder, ignoring errors if it's already gone
const deleteUploadedFile = (avatarUrl) => {
  if (!avatarUrl) return;
  const filePath = path.join(__dirname, '..', avatarUrl); // avatarUrl is like "/uploads/avatar-123.jpg"
  fs.unlink(filePath, (err) => {
    if (err && err.code !== 'ENOENT') console.error('Failed to delete old avatar:', err);
  });
};

// GET /profiles?search=jane
const getAll = async (req, res, next) => {
  try {
    const { search } = req.query;

    const profiles = await prisma.profile.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { jobTitle: { contains: search, mode: 'insensitive' } }
            ]
          }
        : undefined,
      orderBy: [{ isFavorite: 'desc' }, { createdAt: 'desc' }]
    });
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};

// GET /profiles/:id
const getOne = async (req, res, next) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: req.params.id }
    });
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

    const newProfile = await prisma.profile.create({
      data: { name, email, jobTitle, phone, bio, avatarUrl }
    });
    res.status(201).json(newProfile);
  } catch (err) {
    next(err);
  }
};

// PUT /profiles/:id  (multipart/form-data — upload.single('avatar') runs first)
const update = async (req, res, next) => {
  try {
    const existing = await prisma.profile.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: 'Profile not found' });

    const { name, email, jobTitle, phone, bio } = req.body;
    const updateData = { name, email, jobTitle, phone, bio };

    // Only touch avatarUrl if a new file was actually uploaded
    if (req.file) {
      deleteUploadedFile(existing.avatarUrl); // remove the old image from disk
      updateData.avatarUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await prisma.profile.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /profiles/:id
const remove = async (req, res, next) => {
  try {
    const existing = await prisma.profile.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: 'Profile not found' });

    await prisma.profile.delete({ where: { id: req.params.id } });
    deleteUploadedFile(existing.avatarUrl); // clean up the image file too
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// PATCH /profiles/:id/favorite
const toggleFavorite = async (req, res, next) => {
  try {
    const existing = await prisma.profile.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: 'Profile not found' });

    const updated = await prisma.profile.update({
      where: { id: req.params.id },
      data: { isFavorite: !existing.isFavorite } // flip the current value
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove, toggleFavorite };