import models from '../../models';

const { sequelize } = models;
class Location {
  static async createLocation(req, res) {
    try {
      const { dataValues } = await models.Location.create(req.body);
      return res.status(201).json({
        message: 'Location successfully created',
        location: {
          ...dataValues,
          totalResidents: dataValues.femaleOccupantCount + dataValues.maleOccupantCount,
        },
      });
    } catch (error) { // istanbul ignore next
      return res.status(500).json({
        message: 'Error creating location',
        error,
      });
    }
  }

  static async getAllLocations(req, res) {
    try {
      const locations = await models.Location.findAll({
        attributes: ['id', 'name', 'maleOccupantCount', 'femaleOccupantCount', [
          sequelize.literal('"Location"."maleOccupantCount" + "Location"."femaleOccupantCount"'), 'totalCount',
        ]],
        include: [
          { model: models.Location, as: 'parentLocation' },
          {
            model: models.Location,
            as: 'subLocations',
            attributes: ['id', 'name', 'maleOccupantCount', 'femaleOccupantCount', [
              sequelize.literal('"subLocations"."maleOccupantCount" + "subLocations"."femaleOccupantCount"'), 'totalCount',
            ]],
          }],
      });
      return res.status(200).json({
        message: 'Locations retrieved successfully',
        locations,
      });
    } catch (error) { // istanbul ignore next
      return res.status(500).json({
        message: 'Error retrieving locations',
        error,
      });
    }
  }

  static async updateLocation(req, res) {
    try {
      const { location, params: { locationId } } = req;
      if (req.body.parentLocationId === +locationId) {
        return res.status(400).json({
          message: 'Error updating location',
          error: 'parentLocationId should not be the same as locationId',
        });
      }
      await location.update(req.body);
      return res.status(200).json({
        message: 'Location updated successfully',
        location,
      });
    } catch (error) { // istanbul ignore next
      return res.status(500).json({
        message: 'Error updating location',
        error,
      });
    }
  }

  static async deleteLocation(req, res) {
    try {
      const { location } = req;
      await location.destroy();
      return res.status(200).json({
        message: 'Location deleted successfully',
      });
    } catch (error) { // istanbul ignore next
      return res.status(500).json({
        message: 'Error updating location',
        error,
      });
    }
  }
}

export default Location;
