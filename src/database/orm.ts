import 'reflect-metadata';
import { createConnection } from 'typeorm';

export async function startMappers() {
  await createConnection();
}
