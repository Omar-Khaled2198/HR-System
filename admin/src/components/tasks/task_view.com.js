import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";
import moment from "moment";
import { Link } from "react-router-dom";

class TaskView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: {},
			is_loading: true
		};
	}

	async componentDidMount() {
		const response = await ServiceProvider.GET(
			`/tasks/${this.props.match.params.id}`
		);
		this.setState({
			task: response.data,
			is_loading: false
		});
	}

	render() {
		return (
			<div>
				<section className="content-header">
					<h1>
						Task: {!this.state.is_loading && this.state.task.title}
					</h1>
				</section>
				<section className="content">
					<div className="row">
						<div className="col-md-12">
							<div className="box box-solid">
								{!this.state.is_loading && (
									<div
										className="box-body"
										style={{
											fontSize: "16px",
											padding: "20px"
										}}
									>
										<dl>
											<dt>Assigned_to:</dt>
											<dd>
												<Link to={`/admin/users/${this.state.task.assigned_to._id}/profile`}>
												{this.state.task.assigned_to
													.profile.first_name +
													" " +
													this.state.task.assigned_to
														.profile.last_name}
												</Link>
											</dd>
											<br />
											<dt>Description</dt>
											<dd>
												{this.state.task.description}
											</dd>
											<br />
											<dt>Start</dt>
											<dd>
												{moment(
													this.state.task.start_at
												).format("DD-MM-YYYY hh:mm a")}
											</dd>
											<br />
											<dt>Deadline</dt>
											<dd>
												{moment(
													this.state.task.deadline
												).format("DD-MM-YYYY hh:mm a")}
											</dd>
											<br />
											<dt>Status</dt>
											<dd>
												{this.state.vacation.status}
											</dd>
											{this.state.task.status ==
												"Done" && (
												<div>
													<dt>Done Date</dt>
													<dd>
														{moment(
															this.state.task.done
														).format(
															"DD-MM-YYYY hh:mm a"
														)}
													</dd>
												</div>
											)}
										</dl>
										{this.state.task.status !== "Done" && (
											<Link
												style={{ color: "white" }}
												to={{
													pathname: `/admin/tasks/${this.state.task._id}/update`,
													state: {
														data: this.state.task
													}
												}}
											>
												<i className="fa fa-edit" />{" "}
												<button className="btn btn-primary pull-right">
													Update
												</button>
											</Link>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default TaskView;
