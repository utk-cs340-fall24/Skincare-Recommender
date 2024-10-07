import cors from 'cors';
import { json } from 'express';

const applyMiddleware = (app) => {
  app.use(cors());  // Enables CORS
  app.use(json());  // Parses incoming JSON requests
};

export default applyMiddleware;
