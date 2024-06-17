import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

export const hashPassword = async (password: string) => {
  const salt = Number(process.env.SALT_ROUNDS) || 10;
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
