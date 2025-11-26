const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for status checks
const statusList = [];

// Middleware to parse JSON
app.use(express.json());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root endpoint - redirect to API docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// API endpoint: /api/status?who=asker_name
app.get('/api/status', (req, res) => {
  const who = req.query.who;
  
  if (!who) {
    return res.status(400).json({ error: 'Missing required parameter: who' });
  }
  
  // Store the visitor with timestamp
  const entry = {
    who: who,
    timestamp: new Date().toISOString()
  };
  
  statusList.push(entry);
  
  // Return OK message
  res.status(200).send(`OK - ${entry.who} recorded at ${entry.timestamp}`);
});

// API endpoint: /api/list
app.get('/api/list', (req, res) => {
  // Sort by timestamp (ascending order - oldest first)
  const sortedList = [...statusList].sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  
  res.status(200).json(sortedList);
});

// 404 handler - must be after all other routes
app.use((req, res) => {
  console.log(` !HTTP-404! - Redirecting ${req.path} to /api-docs`);
  res.redirect('/api-docs');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

// Export for Vercel
module.exports = app;
