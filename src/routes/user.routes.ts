import { Router, Request, Response } from "express";
import { processUserData } from '../services';
import { USER } from '../types';

const router = Router();

router.post("/", (req: Request, res: Response): void => {
  // console.log(JSON.stringify(req.body));
  const userData: USER = req.body;
  const processedData = processUserData(userData);

  res.status(200).send(processedData);
});

export { router };
