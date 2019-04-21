

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    maleOccupantCount: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    femaleOccupantCount: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    parentLocationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Locations'),
};
