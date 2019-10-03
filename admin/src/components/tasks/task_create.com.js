import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";
import { API_BASE_URL } from "../../utils/constants.utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TaskCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
            title: "",
            description: "",
            assigned_to: "",
            start_at: "",
            deadline: "",
            status: "",
            accounts: [],
            is_loading: true
		};
	}

	async componentDidMount() {
        const response = await ServiceProvider.GET(`${API_BASE_URL}/accounts`);
        this.setState({accounts:response.data,is_loading:false});
	}

	async CreateTask() {
		const task = {
            title: this.state.title,
            description: this.state.description,
            start_at: this.state.start_at,
            deadline: this.state.deadline,
            assigned_to: this.state.assigned_to,
            status: this.state.status
        }

        const response = await ServiceProvider.POST(`${API_BASE_URL}/tasks`,task);
        console.log(response);
        this.props.history.push("/admin/tasks")
    }
    

	render() {

		return (
			<div>
				<section className="content-header">
					<h1>New Task</h1>
				</section>
				<section className="content">
						<div className="box box-primary">
							<div className="box-body">
								<div className="form-group">
									<label>
										Title
									</label>
									<input
										type="text"
                                        className="form-control"
                                        onChange={event => {
											this.setState({
												title: event.target.value
											});
										}}
									/>
								</div>
                                <div className="form-group">
									<label>Description</label>
									<textarea
										className="form-control"
										rows="3"
										placeholder="Enter ..."
										onChange={event => {
											this.setState({
												description: event.target.value
											});
										}}
									/>
								</div>
								<div className="form-group">
									<label>Assign To</label>
									<select
										defaultValue=""
										className="form-control"
										onChange={event => {
											this.setState({
												assigned_to: event.target.value
											});
										}}
									>
										<option
											value=""
											selected
											hidden
										>
											...
										</option>
                                        {
                                            !this.state.is_loading
                                            &&
                                            this.state.accounts.map(account=>{
                                                return(
                                                    <option key={account._id} value={account._id}>
                                                        {account.profile.first_name+" "+account.profile.last_name}
                                                    </option>
                                                )
                                            })
                                        }
									</select>
								</div>
                                <div style={{display:'flex'}}>
                                <div className="customDatePickerWidth form-group">
									<label>Start Date</label>
									<DatePicker
                                            selected={this.state.start_at}
                                            onChange={date => this.setState({start_at:date})}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            timeCaption="time"
											dateFormat="Pp"
											className={"form-control"}
                                    />
								</div>
                                <div className="customDatePickerWidth form-group">
									<label>Deadline</label>
									<DatePicker
                                            selected={this.state.deadline}
                                            onChange={date => this.setState({deadline:date})}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            timeCaption="time"
											dateFormat="Pp"
											className={"form-control"}
                                    />
								</div>
                                </div>
                                <div className="form-group">
									<label>Status</label>
									<select
										defaultValue=""
										className="form-control"
										onChange={event => {
											this.setState({
												status: event.target.value
											});
										}}
									>
										<option
											value=""
											selected
											hidden
										>
											...
										</option>
										<option value="Active">Active</option>
										<option value="Suspended">Suspended</option>
									</select>
								</div>
							</div>
							<div className="box-footer">
								<button
									onClick={() => this.CreateTask()}
									className="btn btn-primary"
								>
									Submit
								</button>
							</div>
						</div>
				</section>
			</div>
		);
	}
}

export default TaskCreate;
