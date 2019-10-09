import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";
import moment from "moment";
import { Link } from "react-router-dom";

class VacationView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vacation: {},
			is_loading: true
		};
	}

	async componentDidMount() {
		const response = await ServiceProvider.GET(
			`/vacations/${this.props.match.params.id}`
		);
		this.setState({
			vacation: response.data,
			is_loading: false
		});
	}

	render() {
		return (
			<div>
				<section className="content-header">
					<h1>
						Vacation:{" "}
						{!this.state.is_loading && this.state.vacation.title}
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
											<dt>Requester:</dt>
											<dd>
                                            <Link to={`/admin/users/${this.state.vacation.requester._id}/profile`}>
												{this.state.vacation.requester
													.profile.first_name +
													" " +
													this.state.vacation.requester
														.profile.last_name}
												</Link>
											</dd>
											<br />
											<dt>Description</dt>
											<dd>
												{
													this.state.vacation
														.description
												}
											</dd>
											<br />
											<dt>Start Date</dt>
											<dd>
												{moment(
													this.state.vacation.from
												).format("DD-MM-YYYY hh:mm a")}
											</dd>
											<br />
											<dt>End Date</dt>
											<dd>
												{moment(
													this.state.vacation.to
												).format("DD-MM-YYYY hh:mm a")}
											</dd>
											<br />
											<dt>Status</dt>
											<dd>
												{this.state.vacation.status}
											</dd>
											<br />
											{this.state.vacation.status ===
												"Rejected" && (
												<div>
													<dt>Note</dt>
													<dd>
														{
															this.state.vacation
																.note
														}
													</dd>
												</div>
											)}
										</dl>
										{this.state.vacation.status !==
											"Aborted" &&
											this.state.vacation.status !==
												"Accepted" && (
												<Link
													style={{ color: "white" }}
													to={{
														pathname: `/admin/vacations/${this.state.vacation._id}/update`,
														state: {
															request: this.state
																.vacation
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

export default VacationView;
