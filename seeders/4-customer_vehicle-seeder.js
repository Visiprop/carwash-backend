'use strict';

var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var array = []
      for (let index = 0; index < 10; index++) {
              
          array.push(
            {
              customer_id:index + 1,
              vehicle_id:index + 1,            
              plate_number:faker.random.number()            
            }
            
          )
      }
      return queryInterface.bulkInsert('customer_vehicles', array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('customer_vehicles', null, {});
  }
};
