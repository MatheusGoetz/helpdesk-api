import 'dotenv/config';
import { config } from 'dotenv';

config({ path: '.env.test' });

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db'; // ou sua URL do Postgres local de teste
