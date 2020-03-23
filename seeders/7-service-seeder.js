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
    // for (let index = 0; index < 10; index++) {
            
        array.push(
          {
            name:'Cuci',
            description:'Cuci Kendaraan',
            price:50000,
            additional_price:20000,
            isDeleted:0
          },
          {
            name:'Cat Warna',
            description:'Cat Warna Kendaraan',
            price:100000,
            additional_price:0,
            isDeleted:0
          }
          
        )
    // }
    return queryInterface.bulkInsert('services', array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('services', null, {});
  }
};
