/* istanbul ignore file */
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import * as healthcheck from 'express-healthcheck';
import test from './test';
import partners from './partners';

const router = express.Router();

router.use('/test', test);
router.use('/healthcheck', healthcheck());
router.use('/partners', partners);
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default router;
