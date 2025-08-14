import bcrypt from 'bcrypt';
import User from '@/models/User';
import { connectDB } from './db';

export async function seedAdmin() {
  await connectDB();

  const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      passwordHash: hashedPassword,
      role: 'admin',
    });
    console.log("✅ Admin user seeded");
  } else {
    console.log("ℹ️ Admin already exists");
  }
}
