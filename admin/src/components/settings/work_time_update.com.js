import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";

class WorkTimeUpdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: {},
			is_loading: true,
			holidays: {
				saturday: false,
				sunday: false,
				monday: false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false
			}
		};
	}

	async componentDidMount() {
		const response = await ServiceProvider.GET(`settings`);
		const settings = response.data;
		var holidays = this.state.holidays;
		response.data.holidays.map(holiday => {
			holidays[holiday] = true;
		});
		this.setState({ settings, holidays, is_loading: false });
	}

	CheckOnChange(day) {
		console.log(day);
		var holidays = this.state.holidays;
		holidays[day] = !holidays[day];
		this.setState({ holidays });
	}

	async UpdateSettings() {
		var settings = this.state.settings;
		var holidays = []
		for (var day in this.state.holidays){
			if(this.state.holidays[day]){
				holidays.push(day);
			}
		}
		settings.holidays = holidays
		ServiceProvider.POST("/settings",settings);
	}

	render() {
		return (
			<div>
				<section className="content-header">
					<h1>Work Time</h1>
				</section>
				{!this.state.is_loading && (
					<section className="content">
						<div className="box box-primary">
							<div className="box-body">
								<div style={{ display: "flex" }}>
									<div className="customDatePickerWidth form-group">
										<label>Start Time</label>
										<input
											value={this.state.settings.start_time}
											type="text"
											className="form-control"
											onChange={(event)=>{
												const time = event.target.value;
												this.setState(prevState => ({
													settings: {
														...prevState.settings,
														start_time: time
													}
												}))
											}}
									/>
									</div>
									<div className="customDatePickerWidth form-group">
										<label>End Time</label>
										<input
											value={this.state.settings.end_time}
											type="text"
											className="form-control"
											onChange={(event)=>{
												const time = event.target.value;
												this.setState(prevState => ({
													settings: {
														...prevState.settings,
														end_time: time
													}
												}))
											}}
									/>
									</div>
								</div>
								<div className="customDatePickerWidth form-group">
									<label>Flexable Time</label>

									<input
											value={this.state.settings.flexable_time}
											type="text"
											className="form-control"
											onChange={(event)=>{
												const time = event.target.value;
												this.setState(prevState => ({
													settings: {
														...prevState.settings,
														flexable_time: time
													}
												}))
											}}/>
								</div>
								<div className="form-group">
									<label>Holidays</label>
									<div className="checkbox">
										<label>
											<input
												type="checkbox"
												value="saturday"
												checked={
													this.state.holidays[
														"saturday"
													]
												}
												onChange={event => {
													this.CheckOnChange(
														event.target.value
													);
												}}
											/>{" "}
											Saturday
										</label>
										<br />
										<label>
											<input
												type="checkbox"
												value="sunday"
												checked={
													this.state.holidays[
														"sunday"
													]
												}
												onChange={event => {
													this.CheckOnChange(
														event.target.value
													);
												}}
											/>{" "}
											Sunday
										</label>
										<br />
										<label>
											<input
												type="checkbox"
												value="monday"
												checked={
													this.state.holidays[
														"monday"
													]
												}
												onChange={event => {
													this.CheckOnChange(
														event.target.value
													);
												}}
											/>{" "}
											Monday
										</label>
										<br />
										<label>
											<input
												type="checkbox"
												value="tuesday"
												checked={
													this.state.holidays[
														"tuesday"
													]
												}
												onChange={event => {
													this.CheckOnChange(
														event.target.value
													);
												}}
											/>{" "}
											Tuesday
										</label>
										<br />
										<label>
											<input
												type="checkbox"
												value="wednesday"
												checked={
													this.state.holidays[
														"wednesday"
													]
												}
												onChange={event => {
													this.CheckOnChange(
														event.target.value
													);
												}}
											/>{" "}
											Wednesday
										</label>
										<br />
										<label>
											<input
												type="checkbox"
												value="thursday"
												checked={
													this.state.holidays[
														"thursday"
													]
												}
												onChange={event => {
													this.CheckOnChange(
														event.target.value
													);
												}}
											/>{" "}
											Thursday
										</label>
										<br />
										<label>
											<input
												type="checkbox"
												value="friday"
												checked={
													this.state.holidays[
														"friday"
													]
												}
												onChange={event => {
													this.CheckOnChange(
														event.target.value
													);
												}}
											/>{" "}
											Friday
										</label>
									</div>
								</div>
							</div>
							<div className="box-footer">
								<button
									onClick={() => this.UpdateSettings()}
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

export default WorkTimeUpdate;
