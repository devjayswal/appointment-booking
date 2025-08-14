import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: { code: "INVALID_INPUT", message: "Email and password are required" } }),
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: { code: "USER_NOT_FOUND", message: "Invalid email or password" } }),
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } }),
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store token in HTTP-only cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60
    });

    return new Response(
      JSON.stringify({ message: "Login successful", role: user.role }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Login Error:", error);
    return new Response(
      JSON.stringify({ error: { code: "SERVER_ERROR", message: "Something went wrong" } }),
      { status: 500 }
    );
  }
}
