const AccountSeeder = require("../seeders/account.seeder");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const MongoDBConenct = require("./mongodb_connect.util");
const TasksSeeder = require("../seeders/tasks.seeder");
const VacationsSeeder = require("../seeders/vacations.seeder");
const AttendanceSeeder = require("../seeders/attendance.seeder");

const Seeder = function () {
  const argv = yargs(hideBin(process.argv)).argv;

  switch (argv.model) {
    case "account": {
      MongoDBConenct(() => {
        AccountSeeder(argv.number);
	  });
	  break;
	}
	case "task": {
		MongoDBConenct(async() => {
			await TasksSeeder(argv.number);
		  });
		  break;
	}
	case "vacation": {
		MongoDBConenct(async() => {
			await VacationsSeeder(argv.number);
		  });
		  break;
	}
	case "attendance": {
		MongoDBConenct(async() => {
			await AttendanceSeeder(argv.number);
		  });
		  break;
		//AttendanceSeeder(argv.number);
	}
  }
};

Seeder();
