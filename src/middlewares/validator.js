import { param, body, validationResult } from 'express-validator/check';
import models from '../../models';

export const validateLocationBody = [
  body('name',
    'Name cannot be empty and must be between 3 and 50 characters long')
    .trim().isLength({ min: 3, max: 50 }),
  body('maleOccupantCount',
    'maleOccupantCount cannot be empty and must be a positive integer')
    .isInt({ gt: 0 }),
  body('femaleOccupantCount',
    'femaleOccupantCount cannot be empty and must be a positive integer')
    .isInt({ gt: 0 }),
  body('parentLocationId',
    'parentLocationId cannot be empty and must be a positive integer')
    .isInt({ gt: 0 }).optional(),
];

export const validateLocationID = [
  param('locationId', 'locationId must be a positive integer')
    .isInt({ gt: 0 }),
];

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Request failed due to validation error',
      errors: errors.array(),
    });
  }
  return next();
};

export const validateParentLocation = async (req, res, next) => {
  const { parentLocationId } = req.body;
  if (parentLocationId) {
    const parentLocation = await models.Location.findByPk(parentLocationId);
    if (parentLocation) {
      return next();
    }
    return res.status(400).json({
      error: 'Parent location does not exist',
    });
  }
  return next();
};

export const checkLocationExists = async (req, res, next) => {
  const { locationId } = req.params;
  const location = await models.Location.findByPk(locationId);
  if (!location) {
    return res.status(404).json({
      error: 'Location does not exist',
    });
  }
  req.location = location;
  return next();
};

export const validateLocationName = async (req, res, next) => {
  const { name, parentLocationId } = req.body;
  const { params: { locationId }, method } = req;
  const query = {
    where: {
      name,
    },
  };
  if (parentLocationId) query.where = { name, parentLocationId };
  const location = await models.Location.findOne(query);
  const isInvalid = method === 'POST' ? location : location && location.id !== +locationId;
  if (isInvalid) {
    return res.status(409).json({
      error: 'A location with this name and parent location already exists',
    });
  }
  return next();
};
