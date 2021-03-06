'use strict';

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
            transaction_id:index + 1,
            customer_vehicle_id:index + 1,
            isDeleted:0            
          }
          
        )
    }
    return queryInterface.bulkInsert('transaction_customer_vehicles', array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('transaction_customer_vehicles', null, {});
  }
};
