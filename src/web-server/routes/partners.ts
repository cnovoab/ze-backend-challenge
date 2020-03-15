/* istanbul ignore file */
import { Router, Request, Response } from 'express';
import * as http from 'http-status-codes';
import PartnerService from '../../services/partner-service';
import {
  validationRules,
  validateInput,
  searchRules,
  findRules
} from '../middlewares/partners';

const router = Router();

router.get('/search', searchRules(), validateInput,
  async (req: Request, res: Response) => {
    try {
      const { lat, lng } = req.query;
      const partner = await PartnerService.findNearest(lat, lng);
      res.json({ partner });
    } catch (error) {
      res.status(http.NOT_FOUND).json();
    }
  });

router.get('/:id', findRules(), validateInput,
  async (req: Request, res: Response) => {
    try {
      const partner = await PartnerService.findById(req.params.id);
      res.json({ partner });
    } catch (error) {
      res.status(http.NOT_FOUND).json();
    }
  });

router.post('/', validationRules(), validateInput,
  async (req: Request, res: Response) => {
    try {
      const partner = await PartnerService.create(req.body);
      res.json({ ...partner });
    } catch (error) {
      if (error.message.includes('unique')) {
        return res.status(http.CONFLICT).json({
          errors: [{
            msg: 'Partner already exists',
            param: 'document',
            location: 'body'
          }]
        });
      }
      res.status(http.INTERNAL_SERVER_ERROR).json();
    }
  });

export default router;
