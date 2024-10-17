const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BusesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const buses = await db.buses.create(
      {
        id: data.id || undefined,

        bus_number: data.bus_number || null,
        operator_name: data.operator_name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await buses.setDriver(data.driver || null, {
      transaction,
    });

    return buses;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const busesData = data.map((item, index) => ({
      id: item.id || undefined,

      bus_number: item.bus_number || null,
      operator_name: item.operator_name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const buses = await db.buses.bulkCreate(busesData, { transaction });

    // For each item created, replace relation files

    return buses;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const buses = await db.buses.findByPk(id, {}, { transaction });

    await buses.update(
      {
        bus_number: data.bus_number || null,
        operator_name: data.operator_name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await buses.setDriver(data.driver || null, {
      transaction,
    });

    return buses;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const buses = await db.buses.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of buses) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of buses) {
        await record.destroy({ transaction });
      }
    });

    return buses;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const buses = await db.buses.findByPk(id, options);

    await buses.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await buses.destroy({
      transaction,
    });

    return buses;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const buses = await db.buses.findOne({ where }, { transaction });

    if (!buses) {
      return buses;
    }

    const output = buses.get({ plain: true });

    output.bookings_bus = await buses.getBookings_bus({
      transaction,
    });

    output.driver = await buses.getDriver({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'driver',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.bus_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('buses', 'bus_number', filter.bus_number),
        };
      }

      if (filter.operator_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('buses', 'operator_name', filter.operator_name),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.driver) {
        const listItems = filter.driver.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          driverId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.buses.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.buses.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('buses', 'bus_number', query),
        ],
      };
    }

    const records = await db.buses.findAll({
      attributes: ['id', 'bus_number'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['bus_number', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.bus_number,
    }));
  }
};
