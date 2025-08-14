import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export function getUserFromToken() {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { userId, role, iat, exp }
  } catch {
    return null;
  }
}

export function requireAuth(roles = []) {
  const user = getUserFromToken();
  if (!user) {
    return { error: { code: "UNAUTHORIZED", message: "Authentication required" }, status: 401 };
  }
  if (roles.length && !roles.includes(user.role)) {
    return { error: { code: "FORBIDDEN", message: "Access denied" }, status: 403 };
  }
  return { user };
}
