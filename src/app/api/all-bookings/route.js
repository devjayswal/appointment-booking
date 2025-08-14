import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAuth('admin'); // ✅ FIXED
    if (auth.error) {
      return new Response(JSON.stringify(auth.error), { status: auth.status });
    }

    await connectDB();

    const bookings = await Booking.find()
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify({ bookings }), { status: 200 });

  } catch (error) {
    console.error("AllBookings Error:", error);
    return new Response(
      JSON.stringify({ error: { code: "SERVER_ERROR", message: "Something went wrong" } }),
      { status: 500 }
    );
  }
}
