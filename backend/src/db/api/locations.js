const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LocationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const locations = await db.locations.create(
      {
        id: data.id || undefined,

        city: data.city || null,
        state: data.state || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return locations;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const locationsData = data.map((item, index) => ({
      id: item.id || undefined,

      city: item.city || null,
      state: item.state || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const locations = await db.locations.bulkCreate(locationsData, {
      transaction,
    });

    // For each item created, replace relation files

    return locations;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const locations = await db.locations.findByPk(id, {}, { transaction });

    await locations.update(
      {
        city: data.city || null,
        state: data.state || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return locations;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const locations = await db.locations.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of locations) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of locations) {
        await record.destroy({ transaction });
      }
    });

    return locations;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const locations = await db.locations.findByPk(id, options);

    await locations.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await locations.destroy({
      transaction,
    });

    return locations;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const locations = await db.locations.findOne({ where }, { transaction });

    if (!locations) {
      return locations;
    }

    const output = locations.get({ plain: true });

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
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.city) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('locations', 'city', filter.city),
        };
      }

      if (filter.state) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('locations', 'state', filter.state),
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
          count: await db.locations.count({
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
      : await db.locations.findAndCountAll({
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
          Utils.ilike('locations', 'city', query),
        ],
      };
    }

    const records = await db.locations.findAll({
      attributes: ['id', 'city'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['city', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.city,
    }));
  }
};
