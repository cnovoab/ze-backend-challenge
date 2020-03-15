/* istanbul ignore file */
import { Router, Request, Response } from 'express';
import * as http from 'http-status-codes';
import Partner from '../../entities/partner';
import { validationRules, validateInput } from '../middlewares/partners';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findOneOrFail(req.params.id);
    res.json({ partner });
  } catch (error) {
    res.status(http.NOT_FOUND).json();
  }
});

router.post('/', validationRules(), validateInput,
  async (req: Request, res: Response) => {
    try {
      const partner = await Partner.create({
        tradingName: req.body.tradingName,
        ownerName: req.body.ownerName,
        document: req.body.document,
        coverageArea: req.body.coverageArea,
        address: req.body.address
      }).save();
      res.json({ ...partner });
    } catch (error) {
      res.status(http.INTERNAL_SERVER_ERROR).json();
    }
  });

export default router;
