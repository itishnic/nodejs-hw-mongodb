// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

import router from './routers/index.js';

import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  // app.use(contactsRouter);
  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
