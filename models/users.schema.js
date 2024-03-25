import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


export const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profileInfo: {
    bio: String,
    socialLinks: [String] // Assuming socialLinks is an array of URLs in string format
  }
});
  


// Pre-save hook to hash password before saving
usersSchema.pre('save', async function (next) {

  if (!this.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with our new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords

export const User = mongoose.model('Users', usersSchema);