/* istanbul ignore file */
import * as express from 'express';
import * as healthcheck from 'express-healthcheck';
import test from './test';
import partners from './partners';

const router = express.Router();

router.use('/test', test);
router.use('/healthcheck', healthcheck());
router.use('/partners', partners);

export default router;
