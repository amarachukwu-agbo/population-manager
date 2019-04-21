import models from '../../models';

class Location {
  static async createLocation(req, res) {
    const { name, parentLocationId } = req.body;
    const query = {
      where: {
        name,
      },
    };
    if (parentLocationId) query.where = { name, parentLocationId };
    const locationExists = await models.Location.findOne(query);
    if (locationExists) {
      return res.status(409).json({
        message: 'Error creating location',
        error: 'A location with this name and parent location already exists',
      });
    }
    const { dataValues } = await models.Location.create(req.body);
    return res.status(201).json({
      message: 'Location successfully created',
      location: {
        ...dataValues,
        totalResidents: dataValues.femaleOccupantCount + dataValues.maleOccupantCount,
      },
    });
  }
}

export default Location;
