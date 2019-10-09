import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";
import { API_BASE_URL } from "../../utils/constants.utils";

class VacationRespond extends Component {
	constructor(props) {
		super(props);
		this.state = {
			request: {},
			status: "",
			note: "",
			is_loading: true
		};
	}

	async componentDidMount() {

		var request = {}
		if(this.props.history.location.state){
			request = this.props.history.location.state.request;
		} else {
			const response = await ServiceProvider.GET(`/vacations/${this.props.match.params.id}`);
			request = response.data
		}
		this.setState({
			request,
			is_loading: false
		});
	}

	async UpdateVacation() {
		const response = await ServiceProvider.PUT(`/vacations/${this.props.match.params.id}`,{
			status:this.state.status,
			note:this.state.note
		})
		console.log(response);
		if(response.status == 200){
			this.props.history.push("/admin/vacations");
		} else {
			console.log(response);
		}
	}

	render() {
		return (
			<div>
				<section className="content-header">
					<h1>Vacation Request Respond</h1>
				</section>
				<section className="content">
					{!this.state.is_loading && (
						<div className="box box-primary">
							<div className="box-body">
								<div className="form-group">
									<label>
										From
									</label>
									<input
										value={this.state.request.from}
										type="text"
										className="form-control"
										disabled
									/>
								</div>
								<div className="form-group">
									<label>
										To
									</label>
									<input
										type="text"
										value={this.state.request.to}
										className="form-control"
										disabled
									/>
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
										<option value="Accepted">Accept</option>
										<option value="Rejected">Reject</option>
									</select>
								</div>
								<div className="form-group">
									<label>Note</label>
									<textarea
										className="form-control"
										rows="3"
										placeholder="Enter ..."
										onChange={event => {
											this.setState({
												note: event.target.value
											});
										}}
									/>
								</div>
							</div>
							<div className="box-footer">
								<button
									onClick={() => this.UpdateVacation()}
									className="btn btn-primary pull-right"
								>
									Submit
								</button>
							</div>
						</div>
					)}
				</section>
			</div>
		);
	}
}

export default VacationRespond;
