import createError from 'http-errors'; // Importing the 'http-errors' module
import express from 'express'; // Importing the 'express' module
import path from 'path'; // Importing the 'path' module
import cookieParser from 'cookie-parser'; // Importing the 'cookie-parser' module
import logger from 'morgan'; // Importing the 'morgan' module
import debug from 'debug'; // Importing the 'debug' module
import http from 'http'; // Importing the 'http' module
import indexRouter from './src/routes/index.js'; // Importing the router module from './src/routes/index.js'
import { fileURLToPath } from 'url'; // Importing the 'fileURLToPath' function from the 'url' module
const __filename = fileURLToPath(import.meta.url); // Getting the filename using 'fileURLToPath' function
const __dirname = path.dirname(__filename); // Getting the directory name from the filename
import dotenv from 'dotenv'; // Importing the 'dotenv' module
dotenv.config(); // Loading the environment variables from the '.env' file
const app = express(); // Creating an instance of the Express application
import ejs from 'ejs'; // Importing the 'ejs' module

const port = normalizePort(process.env.PORT || '3000'); // Setting the port to the value from the environment variable 'PORT' or defaulting to 3000
const server = http.createServer(app); // Creating an HTTP server using the Express app

app.set('port', port); // Setting the 'port' setting of the Express app
app.set('views', path.join(__dirname, './src/views')); // Setting the 'views' directory for rendering views
app.engine('ejs', ejs.__express); // Setting EJS as the view engine
app.set('view engine', 'ejs'); // Setting the view engine to EJS
server.listen(port); // Starting the server and listening on the specified port
server.on('error', onError); // Handling server errors
server.on('listening', onListening); // Handling server listening event
app.use(logger('dev')); // Using the 'morgan' logger middleware for logging HTTP requests
app.use(express.json()); // Parsing JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded request bodies
app.use(cookieParser()); // Parsing cookies
app.use(express.static(path.join(__dirname, './src/public'))); // Serving static files from the 'public' directory

app.use('/', indexRouter); // Mounting the router middleware for the root path

// Handling 404 errors and forwarding to the error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Rendering the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

// Function to handle the 'listening' event of the server
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : +addr.port;
  debug('terminalportfolio:server')('Listening on ' + bind);
  console.log('Listening on port ' + '\x1b[36m%s\x1b[0m', bind);
}

// Function to handle server errors
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

// Function to normalize the port value
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
