import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectdb from './configs/db.js';

const app = express();
const port = 3000;

(async () => {
  try {
    await connectdb();

    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res) => res.send('Server is Live'));

    app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();
