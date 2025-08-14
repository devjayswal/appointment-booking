import { connectDB } from '@/lib/db';
import Slot from '@/models/Slot';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const slots = [];

    // Generate slots dynamically for 7 days
    for (let day = 0; day < 7; day++) {
      const date = new Date(now);
      date.setDate(now.getDate() + day);

      for (let hour = 9; hour < 17; hour++) {
        for (let minute of [0, 30]) {
          const startAt = new Date(date);
          startAt.setHours(hour, minute, 0, 0);

          const endAt = new Date(startAt);
          endAt.setMinutes(startAt.getMinutes() + 30);

          slots.push({
            startAt,
            endAt
          });
        }
      }
    }

    // Fetch booked slots
    const bookedSlots = await Booking.find().select('slotId');
    const bookedIds = bookedSlots.map(b => b.slotId.toString());

    // Return only available slots
    const availableSlots = slots.filter(s => !bookedIds.includes(s.startAt.toISOString()));

    return new Response(JSON.stringify({ slots: availableSlots }), { status: 200 });

  } catch (error) {
    console.error("Slots Error:", error);
    return new Response(
      JSON.stringify({ error: { code: "SERVER_ERROR", message: "Something went wrong" } }),
      { status: 500 }
    );
  }
}
