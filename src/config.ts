import dotenv from 'dotenv';

dotenv.config();

export default {
  jwtSecret: process.env.SECRET_KEY || 'your-default-secret-key'
};