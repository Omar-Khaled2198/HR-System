const VacationRepository = require("../repositories/vacation.repository");
const moment = require("moment");
const Firebase = require("../utils/firebase.util");
const NotificationMapper = require("../utils/notification_mapper.util");

const VacationRepositoryInstance = new VacationRepository();

const CreateVacation = async function (req, res) {
  req.body.created_at = moment().unix();
  req.body.status = "Pending";
  try {
    const vacation = await VacationRepositoryInstance.Create(req.body);
    res.status(200).send({ ...vacation._doc });
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
};

const GetVacation = async function (req, res) {
  try {
    var populate = {
      path: "requester",
      select: "_id profile.first_name profile.last_name",
    };
    const vacation = await VacationRepositoryInstance.Get(
      { _id: req.params.vacation_id },
      populate
    );
    res.status(200).send({ ...vacation._doc });
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
};

const GetAllVacations = async function (req, res) {
  try {
    var query = {};
    var populate = null;
    if (req.query.requester) {
      query.requester = req.query.requester;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (!req.query.requester) {
      populate = {
        path: "requester",
        select: "_id profile.first_name profile.last_name",
      };
    }

    const vacations = await VacationRepositoryInstance.All(query, populate);
    res.status(200).send(vacations);
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
};

const UpdateVacation = async function (req, res) {
  try {
    const query = { _id: req.params.vacation_id };
    const update = { $set: req.body };
    const vacation = await VacationRepositoryInstance.Update(query, update);
	if (req.decoded.role == "hr") {
      await Firebase.messaging().sendToTopic(
        req.body.requester._id,
        NotificationMapper("UPDATEVACATION")
      );
    }
    res.status(200).send({ ...vacation._doc });
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
};

const DeleteVacation = async function (req, res) {
  try {
    await VacationRepositoryInstance.Delete(req.params.vacation_id);
    res.status(200).send({ msg: "Vacation deleted successfully." });
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
};

module.exports = {
  CreateVacation,
  GetVacation,
  UpdateVacation,
  GetAllVacations,
  DeleteVacation,
};
