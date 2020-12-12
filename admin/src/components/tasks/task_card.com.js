import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function TaskCard(props) {
  const { data } = props;
  return (
    <div
      className={
        "box " + (data.status == "Active" ? "box-warning" : "box-danger")
      }
    >
      {/* <div className="box box-warning box-solid"> */}
      <div className="box-header with-border">
        <h3 className="box-title">{data.title}</h3>
      </div>
      <div className="box-body" style={{height:"200px"}}>
        <p>
          <b>Assigned To:</b>{" "}
          <Link
            to={{
              pathname: `/admin/users/${data.assigned_to._id}/profile`,
              state: {
                data: data.assigned_to,
              },
            }}
          >
            {data.assigned_to.profile.first_name +
              " " +
              data.assigned_to.profile.last_name}
          </Link>
        </p>
        <p>
          <b>Start:</b>{" "}
          <Moment format="YYYY/MM/DD h:mm a">{data.start_at}</Moment>
        </p>
        <p>
          <b>Deadline:</b>{" "}
          <Moment format="YYYY/MM/DD h:mm a">{data.deadline}</Moment>
        </p>
        <p>
          <b>Status:</b> {data.status}
        </p>
        <p>
          <b>Description:</b> {data.description}
        </p>
      </div>
      <div
        className={
          "box-footer " + (data.status == "Active" ? "bg-yellow" : "bg-red")
        }
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Link
          style={{ color: "white", alignSelf: "center" }}
          to={{
            pathname: `/admin/tasks/${data._id}/update`,
            state: {
              data,
            },
          }}
        >
          <i className="fa fa-edit" /> Update
        </Link>
      </div>
    </div>
    // <div
    // 	className={
    // 		"small-box " +
    // 		(data.status == "Active" ? "bg-yellow" : "bg-red")
    // 	}
    // >
    // 	<div className="inner">
    // 		<p style={{ fontSize: "25px",textDecoration:"bold" }}>{data.title}</p>
    // 		<h4>
    // 			{data.assigned_to.profile.first_name +
    // 				" " +
    // 				data.assigned_to.profile.last_name}
    // 		</h4>
    // 		<p>
    // 			Start:{" "}
    // 			<Moment format="YYYY/MM/DD h:mm a">{data.start_at}</Moment>
    // 		</p>
    // 		<p>
    // 			Deadline:{" "}
    // 			<Moment format="YYYY/MM/DD h:mm a">{data.deadline}</Moment>
    // 		</p>
    // 		<p>Status: {data.status}</p>
    // 		<p>Description: {data.description}</p>
    // 	</div>
    // 	<span className="small-box-footer">
    // 		<Link
    // 			style={{color:"white"}}
    // 			to={{
    // 				pathname: `/admin/tasks/${data._id}/update`,
    // 				state: {
    // 					data
    // 				}
    // 			}}
    // 		>
    // 			<i className="fa fa-edit"/>{" "}
    // 			Update
    // 		</Link>
    // 	</span>
    // </div>
  );
}

export default TaskCard;
