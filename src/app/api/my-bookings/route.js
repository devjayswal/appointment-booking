import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = requireAuth(['patient']);
    if (auth.error) {
      return new Response(JSON.stringify(auth.error), { status: auth.status });
    }

    await connectDB();

    const bookings = await Booking.find({ userId: auth.user.userId })
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify({ bookings }), { status: 200 });

  } catch (error) {
    console.error("MyBookings Error:", error);
    return new Response(
      JSON.stringify({ error: { code: "SERVER_ERROR", message: "Something went wrong" } }),
      { status: 500 }
    );
  }
}
