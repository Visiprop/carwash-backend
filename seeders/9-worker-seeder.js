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
            KTP_NIK:faker.random.number(),
            phone_number:faker.phone.phoneNumber(),
            address:faker.address.city(),
            isDeleted:0
          }
          
        )
    }
    return queryInterface.bulkInsert('workers', array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('workers', null, {});
  }
};
