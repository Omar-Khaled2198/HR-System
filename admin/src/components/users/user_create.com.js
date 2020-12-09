import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";

class UserCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			job_title: "",
			role: "",
			profile_picture:""
		};
	}

	async CreateAccount() {
		const account = {
			email: this.state.email,
			password: this.state.password,
			role: this.state.role,
			profile: {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				job_title: this.state.job_title
			}
		};
		const response = await ServiceProvider.POST(`accounts`,account);
		if(response.status == 200&&!this.state.profile_picture){
			const data = new FormData();
			console.log(response.data._id);
			data.append("profile_picture",this.state.profile_picture);
			await ServiceProvider.POST(
				`accounts/${response.data._id}/profile_picture`,
				data,
				{ "content-type": "multipart/form-data" }
			);
			
		}
		this.props.history.push(`/admin/users/${response.data._id}/profile`);
		
	}

	render() {
		return (
			<div>
				<section className="content-header">
					<h1>New User</h1>
				</section>
				<section className="content">
					<div className="box box-primary">
						<div className="box-body">
							<div className="form-group">
								<label>
									First Name{" "}
									<span className="text-red">*</span>
								</label>
								<input
									type="text"
									className="form-control"
									onChange={event => {
										this.setState({
											first_name: event.target.value
										});
									}}
								/>
							</div>
							<div className="form-group">
								<label>
									Last Name{" "}
									<span className="text-red">*</span>
								</label>
								<input
									type="text"
									className="form-control"
									onChange={event => {
										this.setState({
											last_name: event.target.value
										});
									}}
								/>
							</div>

							<div className="form-group">
								<label>
									Job Title{" "}
									<span className="text-red">*</span>
								</label>
								<input
									type="text"
									className="form-control"
									onChange={event => {
										this.setState({
											job_title: event.target.value
										});
									}}
								/>
							</div>
							<div className="form-group">
								<label>
									Profile Picture{" "}
									<span className="text-red">*</span>
								</label>
								<input
									type="file"
									className="form-control"
									onChange={event => {
										this.setState({
											profile_picture: event.target.files[0]
										})
									}}
								/>
							</div>
							<div className="form-group">
									<label>Role</label>
									<select
										defaultValue=""
										className="form-control"
										onChange={event => {
											this.setState({
												role: event.target.value
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
										<option value="employee">Employee</option>
										<option value="hr">HR (Admin)</option>
									</select>
								</div>
							<div className="form-group">
								<label>
									Email <span className="text-red">*</span>
								</label>
								<input
									type="email"
									className="form-control"
									onChange={event => {
										this.setState({
											email: event.target.value
										});
									}}
								/>
							</div>
							<div className="form-group">
								<label>
									Password <span className="text-red">*</span>
								</label>
								<input
									type="password"
									className="form-control"
									onChange={event => {
										this.setState({
											password: event.target.value
										});
									}}
								/>
							</div>
						</div>
						<div className="box-footer">
							<button onClick={()=>this.CreateAccount()} className="btn btn-primary">Submit</button>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default UserCreate;
