import FirebaseHandler from "./firebase_handler.util.js";
import moment from "moment";

const Events = function(action) {
	FirebaseHandler.Write(`events/${moment().format("DD-MM-YYYY")}`, {
        user: {
            name: global.account.profile.first_name+ ' ' +global.account.profile.last_name,
            id: global.account._id
        },
        action,
        at : moment().unix()
	});
};

export default Events;
