import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '../helpers';

const checkVersionHandler = async (req: Request, res: Response, next: NextFunction) => {

  const currentVerison = '3.3.6';

  try {
    return res.status(HTTP_STATUS_CODE.OK).send(currentVerison);

  } catch (error) {
    next(error);
  }
};

export { checkVersionHandler };
