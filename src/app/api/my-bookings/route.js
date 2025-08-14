import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    // ✅ Await and pass role
    const user = await requireAuth('patient');

    await connectDB();

    // ✅ Use user.userId directly
    const bookings = await Booking.find({ userId: user.userId })
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
