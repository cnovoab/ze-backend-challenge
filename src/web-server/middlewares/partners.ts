import * as http from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import {
  validationResult,
  body,
  query,
  param
} from 'express-validator';

const CNPJ_REGEXP = /\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/;

const validationRules = () => [
  body('tradingName').notEmpty(),
  body('ownerName').notEmpty(),
  body('document').notEmpty().matches(CNPJ_REGEXP),
  body('coverageArea.type').equals('MultiPolygon'),
  body('coverageArea.coordinates').isArray(),
  body('address.type').equals('Point'),
  body('address.coordinates').isArray()
];

const searchRules = () => [
  query('lat').isNumeric(),
  query('lng').isNumeric()
];

const findRules = () => [
  param('id').isInt().toInt()
];

const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(http.BAD_REQUEST).json({ errors: errors.array() });
};

export { validationRules, findRules, searchRules, validateInput };
