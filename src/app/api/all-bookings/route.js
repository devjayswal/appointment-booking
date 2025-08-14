import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = requireAuth(['admin']);
    if (auth.error) {
      return new Response(JSON.stringify(auth.error), { status: auth.status });
    }

    await connectDB();

    // Fetch all bookings with user info
    const bookings = await Booking.find()
      .populate('userId', 'name email role') // Include user details
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
