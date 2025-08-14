import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['patient', 'admin'], default: 'patient' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
