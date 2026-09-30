import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT) || 5000;

try {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`StudyFlow API listening at http://localhost:${port}`);
  });
} catch (error) {
  console.error('Could not connect to MongoDB. Check MONGODB_URI and make sure the database is reachable.');
  console.error(error.message);
  process.exit(1);
}