import jwt from 'jsonwebtoken'
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';

// export const getRoleFromToken = (token: string): string | null => {
//   try {
//     const decoded = jwt.decode(token);
//     return decoded?.user?.role || null;
//   } catch (error) {
//     console.error('Failed to decode token', error);
//     return null;
//   }
// };

export const getUserIdFromToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded as JwtPayload;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};