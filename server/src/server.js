import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT) || 5000;
try {
  await connectDatabase();
  app.listen(port, () => console.log(`Zevyon API listening on http://localhost:${port}`));
} catch (error) {
  console.error(`Could not start API: ${error.message}`);
  process.exit(1);
}
