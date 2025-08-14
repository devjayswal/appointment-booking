import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: { code: "INVALID_INPUT", message: "All fields are required" } }),
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: { code: "EMAIL_EXISTS", message: "Email is already registered" } }),
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: 'patient'
    });

    return new Response(
      JSON.stringify({ message: "Registration successful", userId: user._id }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Register Error:", error);
    return new Response(
      JSON.stringify({ error: { code: "SERVER_ERROR", message: "Something went wrong" } }),
      { status: 500 }
    );
  }
}
