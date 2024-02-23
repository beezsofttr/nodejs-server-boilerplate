import { Router } from 'express';
import {  checkVersionHandler } from '../controllers/general.controller';

const router = Router();

router.all('/check-version', checkVersionHandler);

export default router;
