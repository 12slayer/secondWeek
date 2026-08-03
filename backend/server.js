require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const prisma = require('./lib/prisma');
const profilesRouter = require('./routes/profiles');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Confirm the database connection on startup (Prisma connects lazily
// otherwise, so this gives you an early, clear error if it's misconfigured)
prisma.$connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Database connection error:', err));

// Global middleware
app.use(cors()); // allows the React dev server (different port) to call this API
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serves uploaded images

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

// Routes
app.use('/profiles', profilesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Close the database connection cleanly when the server stops
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
