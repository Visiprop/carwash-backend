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
            first_name:faker.name.firstName(),
            last_name:faker.name.lastName(),
            email:faker.internet.email(),
            phone_number:faker.phone.phoneNumber(),
            address:faker.address.city(),
          }
          
        )
    }
    return queryInterface.bulkInsert('customers', array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('customers', null, {});
  }
};