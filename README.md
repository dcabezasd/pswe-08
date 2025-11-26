# PSWE-08 Service
This service will run on NodeJS 24 using [express](https://www.npmjs.com/package/express?activeTab=versions). The application will serve a Swagger API UI with following endpoint list:

## api/status?who=asker_name
Will return HTTP-200 with following message: "OK". Will store in an internal list the parameter value (who) and timestamp.

## api/list
Will return HTTP-200 with the internal list, sort by timestamp.


# Packages and Dependencies
- [express](https://www.npmjs.com/package/express?activeTab=versions).
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express?activeTab=versions).
- `vercel.json` - Integration with [Vercel.app](https://vercel.app).

# Installation and Running

## Install Dependencies
```bash
npm install
```

## Run the Application
```bash
npm start
```

The server will start on port 3000 (or the PORT environment variable if set).

## Access the API
- **Swagger UI**: http://localhost:3000/api-docs
- **Status Endpoint**: http://localhost:3000/api/status?who=YourName
- **List Endpoint**: http://localhost:3000/api/list

## Test the Application
```bash
node test.js
```