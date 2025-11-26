// Test script for PSWE-08 Service
const http = require('http');

// Start server in test mode
const app = require('./server.js');

// Wait a moment for server to start
setTimeout(() => {
  console.log('\n=== Testing PSWE-08 Service ===\n');
  
  // Test 1: Call /api/status with different users
  console.log('Test 1: Adding status entries...');
  
  const requests = [
    makeRequest('/api/status?who=Alice'),
    makeRequest('/api/status?who=Bob'),
    makeRequest('/api/status?who=Charlie')
  ];
  
  Promise.all(requests)
    .then(() => {
      console.log('✓ Status entries added successfully\n');
      
      // Test 2: Get the list
      console.log('Test 2: Retrieving list...');
      return makeRequest('/api/list');
    })
    .then((data) => {
      console.log('✓ List retrieved successfully:');
      console.log(JSON.stringify(JSON.parse(data), null, 2));
      console.log('\n=== All tests passed! ===\n');
      process.exit(0);
    })
    .catch((error) => {
      console.error('✗ Test failed:', error);
      process.exit(1);
    });
}, 1000);

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: process.env.PORT || 3000,
      path: path,
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(`Status code: ${res.statusCode}, Response: ${data}`);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}
