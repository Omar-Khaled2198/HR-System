import React, { Component } from "react";
import Message from "./message.com";
import FirebaseHandler from "../../../utils/firebase_handler.util";
import moment from "moment";
import { animateScroll } from "react-scroll";


class Feedback extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			user: props.user,
			is_loading: true,
			message:""
		};
	}

	async componentDidMount() {

		await this.GetMessages();
		this.ListenToMessages();
		console.log(this.state.messages);
	}

	async GetMessages(){
		var messages = []
		const snapshots = await FirebaseHandler.ReadOnce(`feedback/${this.state.user}`);
		snapshots.forEach((childNodes)=>{
				messages.push({...childNodes.val(),key:childNodes.key});
		})
		this.setState({messages,is_loading:false});
		this.ScrollToBottom();
		
		
	}

	ListenToMessages(){
		FirebaseHandler.Listen(`feedback/${this.state.user}`,(snapshot)=>{
			this.setState({messages:[...this.state.messages,{...snapshot.val(),key:snapshot.key}]},()=>{
				this.ScrollToBottom();
			});
			
		})
		
	}

	SendMessage(){
		const message = {
			msg: this.state.message,
			owner: (JSON.parse(localStorage.getItem("account")))._id,
			at: moment().unix()
		}
		FirebaseHandler.Write(`feedback/${this.state.user}`,message);
		this.setState({message:""})
		this.ScrollToBottom();
		
	}

	ScrollToBottom(){
		animateScroll.scrollToBottom({
			containerId: "chat_window",
			duration:100,
			offset: 0
		  });
	}
	
	render() {
		return (
			<div className="box box-primary direct-chat direct-chat-primary" >
				<div className="box-header with-border">
					<h3 className="box-title">Feedback</h3>
				</div>
				{/* /.box-header */}
				<div className="box-body">
					{/* Conversations are loaded here */}
					<div className="direct-chat-messages"id="chat_window">
						{!this.state.is_loading&&(
							this.state.messages.map(message=>{
								if(message.owner===this.state.user){
									return(
										<Message key={message.key} content={message} position="left" />
									)
								} else {
									return (
										<Message key={message.key} content={message} position="right"/>
									)
								}
							})
						)}
					</div>
				</div>
				<div className="box-footer">
						<div className="input-group">
							<input
								type="text"
								name="message"
								value={this.state.message}
								placeholder="Type Message ..."
								className="form-control"
								onChange={event => {
									this.setState({
										message: event.target.value
									});
								}}
							/>
							<span className="input-group-btn">
								<button
									type="button"
									onClick={()=>{this.SendMessage()}}
									className="btn btn-primary btn-flat"
								>
									Send
								</button>
							</span>
						</div>
				</div>
			</div>
		);
	}
}
export default Feedback;
