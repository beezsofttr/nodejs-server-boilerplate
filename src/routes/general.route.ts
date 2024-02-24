import { Router } from 'express';
import { checkVersionHandler, listCustomerHandler, listWithSelectedCustomerHandler } from '../controllers/general.controller';

const router = Router();

router.all('/check-version', checkVersionHandler);

router.all('/list-customers', listCustomerHandler);

router.get('/list-customers/:selectedField', listWithSelectedCustomerHandler);

export default router;
