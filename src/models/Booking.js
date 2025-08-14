import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slotId: { type: String, required: true, unique: true }, // Using startAt ISO string as slotId
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
