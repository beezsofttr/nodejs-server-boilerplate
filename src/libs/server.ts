import express, { NextFunction, Request, Response } from 'express';
import { urlencoded, json } from 'body-parser';
import morgan from 'morgan';

import { API_ROUTES, API_VERSION, HTTP_STATUS_CODE } from '../helpers';
import { generalRoute } from '../routes';

const { PORT, NODE_ENV } = process.env;

const beeServer = () => {
  const app = express();

  app.disable('x-powered-by');
  app.enable('trust proxy');

  app.use(morgan('combined'));

  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: '10kb' }));

  app.all('/', (req, res) => res.sendStatus(HTTP_STATUS_CODE.OK));

  // Routes
  app.use(`${API_VERSION.V1}${API_ROUTES.GENERAL}`, generalRoute);

  // UnKnown Routes
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    next(err);
  });

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    let _err = {
      statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: 'Some Server Error :)',
    };

    if (typeof err === 'string') {
      _err.message = err;
    } else {
      _err.statusCode = err.statusCode ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      _err.message = _err.statusCode === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR ? 'Some Server Error :)' : err.message;
    }

    console.error(`[EXPRESS ERROR] ${_err.statusCode} ${_err.message}`);

    res.status(_err.statusCode).json({
      message: _err.message,
    });
  });

  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.info(`[EXPRESS]\tSuccessfully opened on port ${PORT}`);
      resolve(null);
    });
  });
};

export { beeServer };
