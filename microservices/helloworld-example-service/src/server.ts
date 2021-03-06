import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { keycloak } from './middleware/keycloak';
import { loadRouters } from './utils/loadRouters';
import errorHandler from './middleware/errorHandler';
import { NotFoundError } from './error/errors';

const app: Express = express();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle logs in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors());
}

// Handle security and origin in production
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Handle keycloak authorization
app.use(keycloak.middleware());

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/
const basepath = process.env.API_BASEPATH
  ? `${process.env.API_BASEPATH}`.replace(/\/$/, '')
  : ''; // Default base path

loadRouters(__dirname + '/api')
  .forEach(router => {
    app.use(`${basepath}/api`, router);
  });

// Fallback route
app.use('*', () => {
  throw new NotFoundError();
});

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

app.use(errorHandler);

export default app;
