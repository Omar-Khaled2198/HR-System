import React, { Component } from "react";
import TimelineItem from "./timeline_item";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import FirebaseHandler from "../../utils/firebase_handler.util";

class Timeline extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			events: [],
			is_loading: true
		};
	}

	async componentDidMount() {

		await this.GetTimelineEvents();
		this.ListenToEvents();
	}

	async GetTimelineEvents(){
		var events = []
		console.log(this.state.date);
		const snapshots = await FirebaseHandler.ReadOnce(`events/${moment(this.state.date).format("DD-MM-YYYY")}`);
		this.setState({is_loading:true});
		snapshots.forEach((childNodes)=>{
				events.push({...childNodes.val(),key:childNodes.key});
		})
		this.setState({events: events.reverse(),is_loading:false});
	}

	ListenToEvents(){
		FirebaseHandler.Listen(`events/${moment(this.state.date).format("DD-MM-YYYY")}`,(snapshot)=>{
			this.setState({events:[{...snapshot.val(),key:snapshot.key},...this.state.events]});
		})
	}

	async UpdateTimeLine(date){
		await this.setState({date});
		this.GetTimelineEvents();
	}

	render() {
		const CustomDatePickerInput = ({ value, onClick }) => (
			<span
				className={`${
					moment(value).format("DD-MM-YYYY") ===
					moment(new Date()).format("DD-MM-YYYY")
						? "bg-primary"
						: "bg-red"
				}`}
				style={{
					fontWeight: "bold",
					padding: "7px",
					borderRadius: "4px"
				}}
				onClick={onClick}
			>
				{moment(value).format("DD MMM, YYYY")}
			</span>
		);
		return (
			<div>
				<section className="content-header">
					<h1>Timeline</h1>
				</section>
				<section className="content">
					<div className="row">
						<div className="col-md-12">
							<ul className="timeline">
								<li className="time-label">
									<DatePicker
										selected={this.state.date}
										onChange={ async date => this.UpdateTimeLine(date)}
										customInput={<CustomDatePickerInput />}
									/>
								</li>
								{!this.state.is_loading&&this.state.events.map((event,index)=>(
									<TimelineItem index={index} key={event.key} event={event}/>
								))}
							</ul>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Timeline;
