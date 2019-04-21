import express from 'express';
import Location from './controllers/Location';
import {
  validateLocationBody,
  validateResult,
  validateParentLocation,
  validateLocationID,
  checkLocationExists,
  validateLocationName,
} from './middlewares/validator';

const router = express.Router();

router.post('/locations',
  validateLocationBody,
  validateResult,
  validateParentLocation,
  validateLocationName,
  Location.createLocation);

router.get('/locations', Location.getAllLocations);

router.put('/locations/:locationId',
  validateLocationID,
  validateLocationBody,
  validateResult,
  checkLocationExists,
  validateParentLocation,
  validateLocationName,
  Location.updateLocation);

router.delete('/locations/:locationId',
  validateLocationID,
  validateResult,
  checkLocationExists, Location.deleteLocation);

export default router;
