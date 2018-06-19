// MAIN NODE JS FILE
// =============================================================================
const appRoot = require('app-root-path');
// The web framework for the API
const Koa = require('koa');
// Routes requests to proper endpoints
const api = require('koa-router')();
// Ability to serve static coverage file
const serve = require('koa-static');
// Ability to mount the coverage static file to /swagger
const mount = require('koa-mount');
// Koa 2 async-style middleware for swagger2, and serving UI via swagger-ui.
const koaSwagger = require('koa2-swagger-ui');
// Development style logger middleware for Koa
const logger = require('koa-logger');
// Parse body of calls
const bodyParser = require('koa-bodyparser');
// Allow cross domain
const cors = require('koa2-cors');

// Create instance of the app
const app = new Koa();
// Initialize logging
app.use(logger());
// Parsed body will store in ctx.request.body
app.use(bodyParser());

app.use(cors());

// Routing Setup
const router = require(`${appRoot}/routes/main`);
api.use('/api', router.routes());
app.use(api.routes());

// Swagger Setup
app.use(mount('/swagger', serve(__dirname + '/swagger'))); // Serve directory for config access

app.use(koaSwagger({
  hideTopbar: true, // Hide the bar at top of UI
  routePrefix: '/docs', // Host at / instead of default /docs
  swaggerOptions: {
    url: 'swagger/api-docs.yml', // Config file
    docExpansion: 'list', // Expand Swagger UI to show endpoints
    validatorUrl: null, // Public online validator turned off
  },
}));

app.listen(process.env.PORT);
console.log('Listening on port ' + process.env.PORT);

// Expose the app as a module for testing purposes
module.exports = app;
