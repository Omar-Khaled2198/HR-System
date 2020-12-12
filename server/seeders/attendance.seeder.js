const AttendanceSeeder = async function (number) {
  const faker = require("faker");
  var moment = require('moment');
  const AccountRepository = require("../repositories/account.repository");
  const AccountRepositoryInstance = new AccountRepository();
  const AttandanceRepository = require("../repositories/attendance.repository");
  const AttandanceRepositoryInstance = new AttandanceRepository();

  const account_ids = await AccountRepositoryInstance.All({}, null, "_id");

  let from = moment("2020-12-01");
  let to = moment("2020-12-13");

  for (var d = moment(from); d.isBefore(to); d.add(1, "days")) {

	for (var i = 0; i<account_ids.length ; i++){
		const record = {
			day: d.format("DD"),
			month: d.format("MM"),
			year: d.format("YYYY"),
			employee: account_ids[i],
			status: moment(d).format('dddd') != "Friday"&&moment(d).format('dddd') != "Saturday"?"Attended":"Vacation",
			check_in: moment(d).format('dddd') != "Friday"&&moment(d).format('dddd') != "Saturday"?"09:00:00 am":"",
			check_out: moment(d).format('dddd') != "Friday"&&moment(d).format('dddd') != "Saturday"?"04:00:00 pm":"",
		}
		
		try {
			    AttandanceRepositoryInstance.Create(record);
			    console.log("Done: ", i + 1);
			  } catch (error) {
			    console.log(error);
			  }
	}
  }

};

module.exports = AttendanceSeeder;
