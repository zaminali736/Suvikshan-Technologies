const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BookingsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.create(
      {
        id: data.id || undefined,

        booking_date: data.booking_date || null,
        price: data.price || null,
        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await bookings.setCustomer(data.customer || null, {
      transaction,
    });

    await bookings.setBus(data.bus || null, {
      transaction,
    });

    return bookings;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const bookingsData = data.map((item, index) => ({
      id: item.id || undefined,

      booking_date: item.booking_date || null,
      price: item.price || null,
      status: item.status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const bookings = await db.bookings.bulkCreate(bookingsData, {
      transaction,
    });

    // For each item created, replace relation files

    return bookings;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findByPk(id, {}, { transaction });

    await bookings.update(
      {
        booking_date: data.booking_date || null,
        price: data.price || null,
        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await bookings.setCustomer(data.customer || null, {
      transaction,
    });

    await bookings.setBus(data.bus || null, {
      transaction,
    });

    return bookings;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of bookings) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of bookings) {
        await record.destroy({ transaction });
      }
    });

    return bookings;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findByPk(id, options);

    await bookings.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await bookings.destroy({
      transaction,
    });

    return bookings;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findOne({ where }, { transaction });

    if (!bookings) {
      return bookings;
    }

    const output = bookings.get({ plain: true });

    output.customer = await bookings.getCustomer({
      transaction,
    });

    output.bus = await bookings.getBus({
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
        as: 'customer',
      },

      {
        model: db.buses,
        as: 'bus',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              booking_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              booking_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.booking_dateRange) {
        const [start, end] = filter.booking_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            booking_date: {
              ...where.booking_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            booking_date: {
              ...where.booking_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.customer) {
        const listItems = filter.customer.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          customerId: { [Op.or]: listItems },
        };
      }

      if (filter.bus) {
        const listItems = filter.bus.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          busId: { [Op.or]: listItems },
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
          count: await db.bookings.count({
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
      : await db.bookings.findAndCountAll({
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
          Utils.ilike('bookings', 'booking_date', query),
        ],
      };
    }

    const records = await db.bookings.findAll({
      attributes: ['id', 'booking_date'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['booking_date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.booking_date,
    }));
  }
};
