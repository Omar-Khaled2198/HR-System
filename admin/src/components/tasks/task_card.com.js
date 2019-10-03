import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom"

function TaskCard(props) {
	const { data } = props;
	return (
		<div
			className={
				"small-box " +
				(data.status == "Active" ? "bg-yellow" : "bg-red")
			}
		>
			<div className="inner">
				<p style={{ fontSize: "25px" }}>{data.title}</p>
				<h4>
					{data.assigned_to.profile.first_name +
						" " +
						data.assigned_to.profile.last_name}
				</h4>
				<p>
					Start:{" "}
					<Moment format="YYYY/MM/DD h:mm a">{data.start_at}</Moment>
				</p>
				<p>
					Deadline:{" "}
					<Moment format="YYYY/MM/DD h:mm a">{data.deadline}</Moment>
				</p>
				<p>Status: {data.status}</p>
				<p>Description: {data.description}</p>
			</div>
			<span className="small-box-footer">
				<Link
					style={{color:"white"}}
					to={{
						pathname: `/admin/tasks/${data._id}/update`,
						state: {
							data
						}
					}}
				>
					<i className="fa fa-edit"/>{" "}
					Update
				</Link>
			</span>
		</div>
	);
}

export default TaskCard;
