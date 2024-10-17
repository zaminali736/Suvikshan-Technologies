const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const buses = sequelize.define(
    'buses',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      bus_number: {
        type: DataTypes.TEXT,
      },

      operator_name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  buses.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.buses.hasMany(db.bookings, {
      as: 'bookings_bus',
      foreignKey: {
        name: 'busId',
      },
      constraints: false,
    });

    //end loop

    db.buses.belongsTo(db.users, {
      as: 'driver',
      foreignKey: {
        name: 'driverId',
      },
      constraints: false,
    });

    db.buses.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.buses.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return buses;
};
