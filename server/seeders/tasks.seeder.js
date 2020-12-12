const TasksSeeder = async function (number) {
  const faker = require("faker");
  const AccountRepository = require("../repositories/account.repository");
  const AccountRepositoryInstance = new AccountRepository();
  const TaskRepository = require("../repositories/task.repository");
  const TaskRepositoryInstance = new TaskRepository();

  const account_ids = await AccountRepositoryInstance.All({}, null, "_id");

  for (var i = 0; i < number; i++) {
    const random = Math.floor(Math.random() * account_ids.length);
    let task = {
      title: faker.hacker.phrase(),
      description: faker.lorem.sentence(),
      start_at: faker.date.soon(1),
      deadline: faker.date.soon(7),
      status: "Active",
      assigned_to: account_ids[random]._id,
    };
    try {
      TaskRepositoryInstance.Create(task);
      console.log("Done: ", i + 1);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = TasksSeeder;
