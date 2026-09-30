import { getServers, setServers } from 'node:dns';
import mongoose from 'mongoose';

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing. Set it in server/.env before starting the API.');
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    !process.env.RENDER &&
    getServers().some((server) => server === '127.0.0.1' || server === '::1')
  ) {
    setServers(['8.8.8.8', '8.8.4.4']);
  }

  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'study_planner' });
}