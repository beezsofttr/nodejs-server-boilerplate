import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '../helpers';
import { prisma } from '../libs';

const checkVersionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const currentVerison = '3.3.6';

  try {
    return res.status(HTTP_STATUS_CODE.OK).send(currentVerison);
  } catch (error) {
    next(error);
  }
};

const listWithSelectedCustomerHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { selectedField } = req.params;

  try {
    const data = await prisma.customers.findMany({
      where: {},
      select: {
        [selectedField]: true,
      },
    });

    return res.status(HTTP_STATUS_CODE.OK).send(data);
  } catch (error) {
    next(error);
  }
};

const listCustomerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.customers.findMany({
      where: {},
      select: {},
    });

    return res.status(HTTP_STATUS_CODE.OK).send(data);
  } catch (error) {
    next(error);
  }
};

export { checkVersionHandler, listWithSelectedCustomerHandler, listCustomerHandler };
