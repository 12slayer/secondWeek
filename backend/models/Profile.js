const mongoose = require('mongoose');

// Mongoose schema — a user/team profile
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    jobTitle: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    bio: { type: String, trim: true, default: '' }
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model('Profile', profileSchema);
