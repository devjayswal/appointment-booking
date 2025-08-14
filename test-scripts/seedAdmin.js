// scripts/seedAdmin.js
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';

async function seed() {
  await connectDB();

  const passwordHash = await bcrypt.hash('Passw0rd!', 10);
  await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash,
    role: 'admin'
  });

  console.log('✅ Admin seeded: admin@example.com / Passw0rd!');
  process.exit();
}

seed();
