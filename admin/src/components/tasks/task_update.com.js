import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TaskUpdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: {},
			is_loading: true
		};
	}

	async componentDidMount() {
		var task = {};
		if (this.props.history.location.state) {
			task = this.props.history.location.state.data;
		} else {
			const response = await ServiceProvider.GET(
				`tasks/${this.props.match.params.id}`
			);
			task = response.data;
		}
		this.setState({
			task,
			is_loading: false
		});
		console.log(task);
	}

	async UpdateTask() {
		console.log(this.state.task._id)
		const response = await ServiceProvider.PUT(
			`tasks/${this.state.task._id}`,
			this.state.task
		);
		this.props.history.push("/admin/tasks");
	}

	render() {
		return (
			<div>
				<section className="content-header">
					<h1>
						Update Task:{" "}
						{!this.state.is_loading && this.state.task.title}
					</h1>
				</section>
				{!this.state.is_loading && (
					<section className="content">
						<div className="box box-primary">
							<div className="box-body">
								<div style={{ display: "flex" }}>
									<div className="customDatePickerWidth form-group">
										<label>Start Date</label>
										<DatePicker
											selected={Date.parse(
												this.state.task.start_at
											)}
											onChange={date =>
												this.setState(prevState => ({
													task: {
														...prevState.task,
														start_at: date
													}
												}))
											}
											className={"form-control"}
											showTimeSelect
											timeFormat="HH:mm"
											timeIntervals={15}
											timeCaption="time"
											dateFormat="Pp"
										/>
									</div>
									<div className="customDatePickerWidth form-group">
										<label>Deadline</label>
										<DatePicker
											selected={Date.parse(
												this.state.task.deadline
											)}
											onChange={date =>
												this.setState(prevState => ({
													task: {
														...prevState.task,
														deadline: date
													}
												}))
											}
											className={"form-control"}
											showTimeSelect
											timeFormat="HH:mm"
											timeIntervals={15}
											timeCaption="time"
											dateFormat="Pp"
										/>
									</div>
								</div>
								<div className="form-group">
									<label>Status</label>
									<select
										defaultValue={this.state.task.status}
										className="form-control"
										onChange={event => {
											const value = event.target.value;
											this.setState(prevState => ({
												task: {
													...prevState.task,
													status: value
												}
											}));
										}}
									>
										<option value="Active">Active</option>
										<option value="Suspended">
											Suspended
										</option>
										<option value="Done">Done</option>
									</select>
								</div>
								<div className="customDatePickerWidth form-group">
									<label>Done At</label>

									<DatePicker
										selected={Date.parse(
											this.state.task.done
										)}
										className={"form-control"}
										onChange={date =>
											this.setState(prevState => ({
												task: {
													...prevState.task,
													done: date
												}
											}))
										}
										showTimeSelect
										timeFormat="HH:mm"
										timeIntervals={15}
										timeCaption="time"
										dateFormat="Pp"
										disabled={
											this.state.task.status == "Done"
												? false
												: true
										}
									/>
								</div>
							</div>
							<div className="box-footer">
								<button
									onClick={() => this.UpdateTask()}
									className="btn btn-primary"
								>
									Submit
								</button>
							</div>
						</div>
					</section>
				)}
			</div>
		);
	}
}

export default TaskUpdate;
