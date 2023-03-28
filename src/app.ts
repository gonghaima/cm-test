import express, { Application, Request, Response, NextFunction } from 'express';
const bodyParser = require('body-parser');

import { router as userRoutes } from './routes/user.routes';

const app: Application = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use('/user', userRoutes);

app.use('/', (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: 'Allo! Catch-all route.' });
});

export default app;
