import express from 'express';
import swaggerUi from 'swagger-ui-express';

const app = express();

// In-memory storage for status requests
let statusLog = [];

// Swagger definition
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'PSWE-08 Service API',
    version: '1.0.0',
    description: 'Service with status tracking endpoint'
  },
  servers: [
    {
      url: '/',
      description: 'Development server'
    }
  ],
  paths: {
    '/api/status': {
      get: {
        summary: 'Get service status',
        description: 'Returns service status and logs the requester',
        parameters: [
          {
            name: 'who',
            in: 'query',
            required: true,
            description: 'Name of the requester',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          200: {
            description: 'Service is OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'OK'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/list': {
      get: {
        summary: 'Get status log',
        description: 'Returns list of all status requests sorted by timestamp',
        responses: {
          200: {
            description: 'List of status requests',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      who: {
                        type: 'string'
                      },
                      timestamp: {
                        type: 'string',
                        format: 'date-time'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'PSWE-08 Service is running. Visit /api-docs for API documentation.' });
});

// Status endpoint
app.get('/api/status', (req, res) => {
  const who = req.query.who;

  if (!who) {
    return res.status(400).json({ error: 'Missing "who" query parameter' });
  }

  // Log the request with timestamp
  const entry = {
    who,
    timestamp: new Date().toISOString()
  };
  statusLog.push(entry);

  res.json({ message: 'OK' });
});

// List endpoint
app.get('/api/list', (req, res) => {
  // Sort by timestamp
  const sortedList = [...statusLog].sort((a, b) => 
    new Date(a.timestamp) - new Date(b.timestamp)
  );

  res.json(sortedList);
});

export default app;
