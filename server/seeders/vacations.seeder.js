const VacationsSeeder = async function (number) {
    const faker = require("faker");
    const AccountRepository = require("../repositories/account.repository");
    const AccountRepositoryInstance = new AccountRepository();
    const VacationRepository = require("../repositories/vacation.repository");
    const VacationRepositoryInstance = new VacationRepository();
    const moment = require("moment")
    const account_ids = await AccountRepositoryInstance.All({}, null, "_id");
  
    for (var i = 0; i < number; i++) {
      const random = Math.floor(Math.random() * account_ids.length);
      let vacation = {
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        from: faker.date.soon(1),
        created_at: moment().unix(),
        to: faker.date.soon(7),
        status: "Pending",
        requester: account_ids[random]._id,
      };
      try {
        VacationRepositoryInstance.Create(vacation);
        console.log("Done: ", i + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  module.exports = VacationsSeeder;
  