import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/auth';

export async function POST(req) {
  try {
    const auth = requireAuth(['patient']);
    if (auth.error) {
      return new Response(JSON.stringify(auth.error), { status: auth.status });
    }

    const { slotId } = await req.json();
    if (!slotId) {
      return new Response(
        JSON.stringify({ error: { code: "INVALID_INPUT", message: "slotId is required" } }),
        { status: 400 }
      );
    }

    await connectDB();

    // Check if slot already booked
    const existing = await Booking.findOne({ slotId });
    if (existing) {
      return new Response(
        JSON.stringify({ error: { code: "SLOT_TAKEN", message: "This slot is already booked" } }),
        { status: 409 }
      );
    }

    // Create booking
    await Booking.create({
      userId: auth.user.userId,
      slotId
    });

    return new Response(
      JSON.stringify({ message: "Booking successful" }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Booking Error:", error);
    return new Response(
      JSON.stringify({ error: { code: "SERVER_ERROR", message: "Something went wrong" } }),
      { status: 500 }
    );
  }
}
