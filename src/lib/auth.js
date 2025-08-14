import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export async function requireAuth(role) {
  const user = await getUserFromToken();
  if (!user) {
    return {
      error: { code: "UNAUTHORIZED", message: "You must be logged in" },
      status: 401
    };
  }
  if (role && user.role !== role) {
    return {
      error: { code: "FORBIDDEN", message: "You do not have permission to perform this action" },
      status: 403
    };
  }
  return user;
}
