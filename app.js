import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import debug from 'debug';
import http from 'http';
import indexRouter from './src/routes/index.js';
import projectsRouter from './src/routes/projects.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import ejs from 'ejs';

const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

app.set('port', port);
app.set('views', path.join(__dirname, './src/views'));
app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/', indexRouter);
app.use('/projects', projectsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : +addr.port;
  debug('terminalportfolio:server')('Listening on ' + bind);
  console.log('Listening on port ' + '\x1b[36m%s\x1b[0m', bind);
}

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
