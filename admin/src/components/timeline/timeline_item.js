import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function TimelineItem(props) {
	const { event } = props;
	return (
		<li>
			<i className="fa fa-user bg-aqua" />
			<div className="timeline-item">
				<span className="time">
					<i className="fa fa-clock-o" />{" "}
					{moment.unix(event.at).format("hh:mm a")}
				</span>
				<h3 className="timeline-header no-border">
					<Link to={`admin/users/${event.user.id}/profile`}>
						{event.user.name}
          </Link>
          {" "}
          {event.action.msg}
          {" to view it "}
					<Link
						to={`admin/${event.action.resource}/${event.action.id}/view`}
					>
						click here.
					</Link>
				</h3>
			</div>
		</li>
	);
}

export default TimelineItem;
