# PSWE-08 Service
This service will run on NodeJS 24 using [express|https://www.npmjs.com/package/express?activeTab=versions]. The application will serve a Swagger API UI with following endpoint list:

## api/status?who=asker_name
Will return HTTP-200 with following message: "OK". Will store in an internal list the parameter value (who) and timestamp.

## api/list
Will return HTTP-200 with the internal list, sort by timestamp.


# Packages and Dependencies
- [express|https://www.npmjs.com/package/express?activeTab=versions].
- [swagger-ui-express|https://www.npmjs.com/package/swagger-ui-express?activeTab=versions].
- `vercel.json` - Integration with [Vercel.app|https://vercel.app].