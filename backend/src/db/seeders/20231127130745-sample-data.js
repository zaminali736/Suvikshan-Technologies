const db = require('../models');
const Users = db.users;

const Bookings = db.bookings;

const Buses = db.buses;

const Locations = db.locations;

const Notifications = db.notifications;

const Offers = db.offers;

const BookingsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    booking_date: new Date('2023-10-01T10:00:00Z'),

    price: 500,

    status: 'booked',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    booking_date: new Date('2023-10-02T15:00:00Z'),

    price: 750,

    status: 'booked',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    booking_date: new Date('2023-10-03T09:00:00Z'),

    price: 600,

    status: 'booked',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    booking_date: new Date('2023-10-04T12:00:00Z'),

    price: 450,

    status: 'booked',
  },
];

const BusesData = [
  {
    bus_number: 'MH12AB1234',

    operator_name: 'City Travels',

    // type code here for "relation_one" field
  },

  {
    bus_number: 'DL8C5678',

    operator_name: 'National Express',

    // type code here for "relation_one" field
  },

  {
    bus_number: 'KA05MN4321',

    operator_name: 'Southern Travels',

    // type code here for "relation_one" field
  },

  {
    bus_number: 'TN09XY9876',

    operator_name: 'Metro Bus Service',

    // type code here for "relation_one" field
  },
];

const LocationsData = [
  {
    city: 'Mumbai',

    state: 'Maharashtra',
  },

  {
    city: 'Delhi',

    state: 'Delhi',
  },

  {
    city: 'Bangalore',

    state: 'Karnataka',
  },

  {
    city: 'Chennai',

    state: 'Tamil Nadu',
  },
];

const NotificationsData = [
  {
    // type code here for "relation_one" field

    message: 'Your bus booking is confirmed.',

    sent_at: new Date('2023-10-01T11:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    message: 'Your bus has departed.',

    sent_at: new Date('2023-10-02T16:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    message: 'Your booking has been cancelled.',

    sent_at: new Date('2023-10-03T10:00:00Z'),
  },

  {
    // type code here for "relation_one" field

    message: 'Your bus is arriving soon.',

    sent_at: new Date('2023-10-04T13:00:00Z'),
  },
];

const OffersData = [
  {
    title: 'Diwali Special',

    description: 'Get 20% off on all bookings during Diwali.',

    valid_from: new Date('2023-10-10T00:00:00Z'),

    valid_until: new Date('2023-10-20T23:59:59Z'),
  },

  {
    title: 'Weekend Getaway',

    description: 'Flat 15% discount on weekend trips.',

    valid_from: new Date('2023-10-01T00:00:00Z'),

    valid_until: new Date('2023-10-31T23:59:59Z'),
  },

  {
    title: 'Early Bird Offer',

    description: 'Book early and save 10% on your fare.',

    valid_from: new Date('2023-10-01T00:00:00Z'),

    valid_until: new Date('2023-12-31T23:59:59Z'),
  },

  {
    title: 'Loyalty Bonus',

    description: 'Earn points on every trip and redeem for discounts.',

    valid_from: new Date('2023-10-01T00:00:00Z'),

    valid_until: new Date('2024-01-01T23:59:59Z'),
  },
];

// Similar logic for "relation_many"

async function associateBookingWithCustomer() {
  const relatedCustomer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Booking0 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Booking0?.setCustomer) {
    await Booking0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Booking1 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Booking1?.setCustomer) {
    await Booking1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Booking2 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Booking2?.setCustomer) {
    await Booking2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Booking3 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Booking3?.setCustomer) {
    await Booking3.setCustomer(relatedCustomer3);
  }
}

async function associateBookingWithBus() {
  const relatedBus0 = await Buses.findOne({
    offset: Math.floor(Math.random() * (await Buses.count())),
  });
  const Booking0 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Booking0?.setBus) {
    await Booking0.setBus(relatedBus0);
  }

  const relatedBus1 = await Buses.findOne({
    offset: Math.floor(Math.random() * (await Buses.count())),
  });
  const Booking1 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Booking1?.setBus) {
    await Booking1.setBus(relatedBus1);
  }

  const relatedBus2 = await Buses.findOne({
    offset: Math.floor(Math.random() * (await Buses.count())),
  });
  const Booking2 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Booking2?.setBus) {
    await Booking2.setBus(relatedBus2);
  }

  const relatedBus3 = await Buses.findOne({
    offset: Math.floor(Math.random() * (await Buses.count())),
  });
  const Booking3 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Booking3?.setBus) {
    await Booking3.setBus(relatedBus3);
  }
}

async function associateBusWithDriver() {
  const relatedDriver0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Bus0 = await Buses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Bus0?.setDriver) {
    await Bus0.setDriver(relatedDriver0);
  }

  const relatedDriver1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Bus1 = await Buses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Bus1?.setDriver) {
    await Bus1.setDriver(relatedDriver1);
  }

  const relatedDriver2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Bus2 = await Buses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Bus2?.setDriver) {
    await Bus2.setDriver(relatedDriver2);
  }

  const relatedDriver3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Bus3 = await Buses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Bus3?.setDriver) {
    await Bus3.setDriver(relatedDriver3);
  }
}

async function associateNotificationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setUser) {
    await Notification0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setUser) {
    await Notification1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setUser) {
    await Notification2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification3 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Notification3?.setUser) {
    await Notification3.setUser(relatedUser3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Bookings.bulkCreate(BookingsData);

    await Buses.bulkCreate(BusesData);

    await Locations.bulkCreate(LocationsData);

    await Notifications.bulkCreate(NotificationsData);

    await Offers.bulkCreate(OffersData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateBookingWithCustomer(),

      await associateBookingWithBus(),

      await associateBusWithDriver(),

      await associateNotificationWithUser(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bookings', null, {});

    await queryInterface.bulkDelete('buses', null, {});

    await queryInterface.bulkDelete('locations', null, {});

    await queryInterface.bulkDelete('notifications', null, {});

    await queryInterface.bulkDelete('offers', null, {});
  },
};
