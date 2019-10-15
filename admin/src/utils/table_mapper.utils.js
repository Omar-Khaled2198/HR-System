import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";

const TableMapper = function(table_name,hide=[]) {
	switch (table_name) {
		case "VACATIONS":
			return [
				{
					Header: "Title",
					accessor: "title"
				},
				!hide.includes("Requester")?{
					id: "requester _id",
					Header: "Requester",
					accessor: d => {
						if(d.requester.profile!=="undefined"){
							return (
								<Link to={`/admin/users/${d.requester._id}/profile`}>
									{
										d.requester.profile.first_name +
										" " +
										d.requester.profile.last_name}
								</Link>
							);
						}
					},
				}:{show:false},
				{
					Header: "From",
					accessor: "from",
					Cell: props => Moment(props.value).format('YYYY/MM/DD h:mm a')
					
				},
				{
					Header: "To",
					accessor: "to",
					Cell: props => Moment(props.value).format('YYYY/MM/DD h:mm a')
				},
				{
					Header: "Status",
					accessor: "status",
					Cell: props => {
						if (props.value == "Pending")
							return (
								<span className="label label-warning">Pending</span>
							);
						else if (props.value == "Accepted")
							return (
								<span className="label label-success">
									Accepted
								</span>
							);
						else if (props.value == "Rejected")
							return (
								<span className="label label-danger">Rejected</span>
							);
						else
							return (
								<span className="label label-default">Aborted</span>
							);
					}
				},
				{
					Header: "Note",
					accessor: "note"
				}
			];

		case "TASKS":
			return [
				{
					Header: "Title",
					accessor: "title"
				},
				!hide.includes("Assigned_To")?{
					id: "assigned_to _id",
					Header: "Assigned To",
					accessor: d => {
						if(d.assigned_to.profile!=="undefined"){
							return (
								<Link to={`/admin/users/${d.assigned_to._id}/profile`}>
									{
										d.assigned_to.profile.first_name +
										" " +
										d.assigned_to.profile.last_name}
								</Link>
							);
						}
						
					},
				}:{show:false},
				{
					Header: "Description",
					accessor: "description"
				},
				{
					Header: "Start Date",
					accessor: "start_at",
					Cell: props => Moment(props.value).format('YYYY/MM/DD h:mm a')
				},
				{
					Header: "Deadline",
					accessor: "deadline",
					Cell: props => Moment(props.value).format('YYYY/MM/DD h:mm a')
				}
			];

		case "ATTENDANCE":
				return [
					!hide.includes("Employee")?{
						id: "employee _id",
						Header: "Employee",
						accessor: d => {
							if(d.employee.profile!=="undefined"){
								return (
									<Link to={`/admin/users/${d.employee._id}/profile`}>
										{
											d.employee.profile.first_name +
											" " +
											d.employee.profile.last_name}
									</Link>
								);
							}
							
						},
					}:{show:false},
					{
						Header: "Status",
						accessor: "status",
						Cell: props => {
							if (props.value == "Vacation")
								return (
									<span className="label label-warning">Vacation</span>
								);
							else if (props.value == "Attended")
								return (
									<span className="label label-success">
										Attended
									</span>
								);
							else if (props.value == "Absent")
								return (
									<span className="label label-danger">Absent</span>
								);
						}
					},
					{
						Header: "Check In",
						accessor: "check_in"
					},
					{
						Header: "Check Out",
						accessor: "check_out",
					}
				];
	}
};

export default TableMapper;
