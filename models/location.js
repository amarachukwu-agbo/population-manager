

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maleOccupantCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    femaleOccupantCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Location.associate = (models) => {
    Location.belongsTo(models.Location, {
      as: 'parentLocation',
      foreignKey: 'parentLocationId',
    });
    Location.hasMany(models.Location, {
      as: 'subLocation',
      foreignKey: 'parentLocationId',
    });
  };
  return Location;
};
