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
            date:faker.date.past(),            
            status:'LUNAS'
          }
          
        )
    }
    return queryInterface.bulkInsert('transactions', array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('transactions', null, {});
  }
};
