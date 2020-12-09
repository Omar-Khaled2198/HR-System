import React, { Component } from "react";
import ServiceProvider from "../../utils/service_provider.utils";

class Notifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			target: "all",
			is_loading: true,
			topics: [],
			selected: [],
			title: "",
			body: ""
		};
	}

	async componentDidMount() {
		const response = await ServiceProvider.GET("/accounts");
		if (response.status == 200)
			this.setState({
				topics: response.data.filter(account => account.profile),
				is_loading: false
			});
	}

	async Select(id, index) {
		const account = this.state.topics[index];
		var topics = this.state.topics.filter(
			account => account._id !== id
		);
		this.setState(prevState => ({
			topics,
			selected: [...prevState.selected, account]
		}));
	}

	async UnSelect(id,index){
		const account = this.state.selected[index];
		var selected = this.state.selected.filter(
			account => account._id !== id
		);
		this.setState(prevState => ({
			selected,
			topics: [...prevState.topics, account]
		}));
	}

	async SendNotification(){
		if(this.state.target==="all"){
			const response = await ServiceProvider.POST("notifications/all",{
				title:this.state.title,
				body: this.state.body
			});
			console.log(response);
		} else {
			const selected = this.state.selected.map(account=>{return account._id});
			console.log(selected);
			const response = await ServiceProvider.POST("notifications",{
				title:this.state.title,
				body: this.state.body,
				topics:selected
			})

			console.log(response);
		}
	}

	render() {
		return (
			<div>
				<section className="content-header">
					<h1>Notifications</h1>
				</section>
				<section className="content">
					<div className="box box-primary">
						<div className="box-body">
							<div className="form-group">
								<label>Notification Title</label>
								<input
									value={this.state.title}
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
								<label>Notification Body</label>
								<input
									type="text"
									value={this.state.body}
									className="form-control"
									onChange={event => {
										this.setState({
											body: event.target.value
										});
									}}
								/>
							</div>
							<div className="form-group">
								<label>Targets</label>
								<select
									defaultValue=""
									className="form-control"
									onChange={event => {
										this.setState({
											target: event.target.value
										});
									}}
								>
									<option value="" selected hidden>
										...
									</option>
									<option value="all">All</option>
									<option value="select">Select</option>
								</select>
							</div>
							<div className="form-group">
								<label>Employees</label>
								<select
									defaultValue=""
									className="form-control"
									onChange={event =>
										this.Select(
											event.target.value,
											event.target.selectedIndex - 1
										)
									}
									disabled={
										this.state.target === "all"
											? true
											: false
									}
								>
									<option value="" selected hidden>
										...
									</option>
									{!this.state.is_loading &&
										this.state.topics.map(
											(account, index) => (
												<option
													key={account._id}
													value={account._id}
												>
													{account.profile
														.first_name +
														" " +
														account.profile
															.last_name}
												</option>
											)
										)}
								</select>
							</div>
							<div className="flex flex-column">
								{this.state.selected.map((account,index) => (
									<div
										className="btn-group"
										key={index}
										style={{
											marginRight: 10,
											marginBottom: 10
										}}
									>
										<span className="btn btn-success">
											{account.profile.first_name +
												" " +
												account.profile.last_name}
										</span>
										<button
											value={account._id}
											type="button"
											className="btn btn-success"
											onClick={()=>{this.UnSelect(account._id,index)}}

										>
											<i className="fa fa-remove"></i>
										</button>
									</div>
								))}
							</div>
						</div>
						<div className="box-footer">
							<button
								onClick={() => this.SendNotification()}
								className="btn btn-primary pull-right"
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

export default Notifications;
