import express from 'express';
import Location from './controllers/Location';
import {
  validateLocationBody,
  validateResult,
  validateParentLocation,
} from './middlewares/validator';

const router = express.Router();

router.post('/locations',
  validateLocationBody,
  validateResult,
  validateParentLocation,
  Location.createLocation);

export default router;
