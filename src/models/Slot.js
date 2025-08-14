import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  startAt: { type: Date, required: true, unique: true },
  endAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Slot || mongoose.model('Slot', slotSchema);
