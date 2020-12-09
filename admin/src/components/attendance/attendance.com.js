import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ServiceProvider from "../../utils/service_provider.utils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import TableMapper from "../../utils/table_mapper.utils";

class Attendance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			records: [],
			is_loading: true
		};
	}

	async componentDidMount() {
		await this.GetAttendance();
	}

	async GetAttendance() {
		const response = await ServiceProvider.GET(
			`attendance?day=${moment(this.state.date).format(
				"DD"
			)}&month=${moment(this.state.date).format(
				"MM"
			)}&year=${moment().format("YYYY")}`
		);
		console.log(response.data);
		this.setState({ records: response.data, is_loading: false });
	}

	async UpdateDate(date) {
		await this.setState({ date });
		this.GetAttendance();
	}

	render() {
		const CustomDatePickerInput = ({ value, onClick }) => (
			<h3
				className={"box-title center text-primary"}
				style={{
					fontWeight: "bold"
				}}
				onClick={onClick}
			>
				{moment(value).format("DD MMM, YYYY")}
			</h3>
		);
		return (
			<div>
				<section className="content-header">
					<h1>Attendance</h1>
				</section>
				<section className="content">
					<div className="row">
						<div className="col-md-12">
							<div className="box box-primary">
								<div
									className="box-header with-border"
									style={{
										display: "flex",
										justifyContent: "center"
									}}
								>
									<DatePicker
										selected={this.state.date}
										onChange={async date =>
											this.UpdateDate(date)
										}
										customInput={<CustomDatePickerInput />}
									/>
								</div>
								<div className="box-body">
									{!this.state.is_loading && (
										<ReactTable
											data={this.state.records}
											columns={TableMapper("ATTENDANCE")}
											minRows={0}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Attendance;
