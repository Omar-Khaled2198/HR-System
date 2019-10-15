const AttendanceRepository = require("../repositories/attendance.repository");
const SettingsRepository = require("../repositories/settings.repository");
const inside = require("point-in-polygon");
const moment = require("moment");

const SettingsRepositoryInstance = new SettingsRepository();
const AttendanceRepositoryInstance = new AttendanceRepository();

const CheckIn = async function(req, res) {
	const check = await IsInside([req.body.longitude, req.body.latitude]);
	if (check) {
		req.body = {
			employee: req.params.employee_id,
			status: "Attended",
			day: moment().format("DD/MM/YYYY"),
			check_in: moment().format("hh:mm:ss a")
		};
		CreateRecord(req, res);
	} else {
		res.status(400).send({ msg: "No" });
	}
};

// const CheckOut = async function(req, res) {
// 	const check = await IsInside([req.body.longitude, req.body.latitude]);
// 	if (check) {
// 		var record = await AttendanceRepository.Update({
// 			day: moment().format("DD/MM/YYYY"),
// 			employee: req.params.employee_id
//         });

// 		CreateRecord(req, res);
// 	} else {
// 		res.status(400).send({ msg: "No" });
// 	}
// };

const IsInside = async function(coordinate) {
	
	const settings = await SettingsRepositoryInstance.Get(
		{},
		null,
		"location_coordinates"
	);
	const area = settings.location_coordinates.map(coordinate => {
		return [coordinate.longitude, coordinate.latitude];
	});
	return inside(coordinate, area);
};

const CreateRecord = async function(req, res) {
	try {
		const record = await AttendanceRepositoryInstance.Create(req.body);
		const recordJSON = record.toJSON();
		res.status(200).send({ ...recordJSON });
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const GetRecord = async function(req, res) {
	try {
		var populate = {
			path: "employee",
			select: "_id profile.first_name profile.last_name"
		};
		const record = await AttendanceRepositoryInstance.Get(
			{ _id: req.params.record_id },
			populate
		);
		const recordJSON = record.toJSON();
		res.status(200).send({ ...recordJSON });
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const GetAllRecords = async function(req, res) {
	try {
		var query = {};
		var populate = null;

		if (req.query.employee) {
			query.employee = req.query.employee;
		}

		if (req.query.day) {
			query.day = decodeURI(req.query.day);
		}

		if (req.query.status) {
			query.status = req.query.status;
		}

		if (!req.query.employee) {
			populate = {
				path: "employee",
				select: "_id profile.first_name profile.last_name"
			};
		}

		const records = await AttendanceRepositoryInstance.All(query, populate);
		res.status(200).send(records);
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const UpdateRecord = async function(req, res) {
	try {
		const query = { _id: req.params.record_id };
		const update = { $set: req.body };
		const record = await AttendanceRepositoryInstance.Update(query, update);
		const recordJSON = record.toJSON();
		res.status(200).send({ ...recordJSON });
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const DeleteRecord = async function(req, res) {
	try {
		await AttendanceRepositoryInstance.Delete(req.params.record_id);
		res.status(200).send({ msg: "Record deleted successfully." });
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

module.exports = {
	CheckIn,
	CreateRecord,
	GetRecord,
	GetAllRecords,
	UpdateRecord,
	DeleteRecord
};
