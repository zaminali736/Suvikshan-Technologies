const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('system_manager'),
        name: 'system_manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('operations_lead'),
        name: 'operations_lead',
        createdAt,
        updatedAt,
      },

      {
        id: getId('customer_support'),
        name: 'customer_support',
        createdAt,
        updatedAt,
      },

      { id: getId('bus_driver'), name: 'bus_driver', createdAt, updatedAt },

      { id: getId('traveler'), name: 'traveler', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'bookings',
      'buses',
      'locations',
      'notifications',
      'offers',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('bus_driver'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('traveler'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('CREATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('CREATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('bus_driver'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('traveler'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('traveler'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('CREATE_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('READ_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('UPDATE_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('UPDATE_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('bus_driver'),
        permissionId: getId('READ_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('traveler'),
        permissionId: getId('READ_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('READ_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('UPDATE_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('UPDATE_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('bus_driver'),
        permissionId: getId('READ_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('traveler'),
        permissionId: getId('READ_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('bus_driver'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('traveler'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('CREATE_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('READ_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('UPDATE_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('UPDATE_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('bus_driver'),
        permissionId: getId('READ_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('traveler'),
        permissionId: getId('READ_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('operations_lead'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('bus_driver'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('traveler'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_BUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_BUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_BUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_BUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_LOCATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_LOCATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_LOCATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_LOCATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_OFFERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_OFFERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_OFFERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_OFFERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'system_manager',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'operations_lead',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
