const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const bookings = sequelize.define(
    'bookings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      booking_date: {
        type: DataTypes.DATE,
      },

      price: {
        type: DataTypes.DECIMAL,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['booked', 'cancelled', 'completed'],
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

  bookings.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.bookings.belongsTo(db.users, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.bookings.belongsTo(db.buses, {
      as: 'bus',
      foreignKey: {
        name: 'busId',
      },
      constraints: false,
    });

    db.bookings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.bookings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return bookings;
};
