import React, { Component } from "react";

class Chat extends Component {
	
	render() {
		return (
			<div className="box box-primary direct-chat direct-chat-primary">
				<div className="box-header with-border">
					<h3 className="box-title">Chat</h3>
				</div>
				{/* /.box-header */}
				<div className="box-body">
					{/* Conversations are loaded here */}
					<div className="direct-chat-messages">
						{/* Message. Default to the left */}
						<div className="direct-chat-msg">
							<div className="direct-chat-info clearfix">
								<span className="direct-chat-name pull-left">
									Alexander Pierce
								</span>
								<span className="direct-chat-timestamp pull-right">
									23 Jan 2:00 pm
								</span>
							</div>
							{/* /.direct-chat-info */}
							<img
								className="direct-chat-img"
								src="assets/dist/img/user1-128x128.jpg"
								alt="message user image"
							/>
							{/* /.direct-chat-img */}
							<div className="direct-chat-text">
								Is this template really for free? That's
								unbelievable!
							</div>
							{/* /.direct-chat-text */}
						</div>
						{/* /.direct-chat-msg */}
						{/* Message to the right */}
						<div className="direct-chat-msg right">
							<div className="direct-chat-info clearfix">
								<span className="direct-chat-name pull-right">
									Sarah Bullock
								</span>
								<span className="direct-chat-timestamp pull-left">
									23 Jan 2:05 pm
								</span>
							</div>
							{/* /.direct-chat-info */}
							<img
								className="direct-chat-img"
								src="assets/dist/img/user3-128x128.jpg"
								alt="message user image"
							/>
							{/* /.direct-chat-img */}
							<div className="direct-chat-text">
								You better believe it!
							</div>
							{/* /.direct-chat-text */}
						</div>
						{/* /.direct-chat-msg */}
						{/* Message. Default to the left */}
						<div className="direct-chat-msg">
							<div className="direct-chat-info clearfix">
								<span className="direct-chat-name pull-left">
									Alexander Pierce
								</span>
								<span className="direct-chat-timestamp pull-right">
									23 Jan 5:37 pm
								</span>
							</div>
							{/* /.direct-chat-info */}
							<img
								className="direct-chat-img"
								src="assets/dist/img/user1-128x128.jpg"
								alt="message user image"
							/>
							{/* /.direct-chat-img */}
							<div className="direct-chat-text">
								Working with AdminLTE on a great new app! Wanna
								join?
							</div>
							{/* /.direct-chat-text */}
						</div>
						{/* /.direct-chat-msg */}
						{/* Message to the right */}
						<div className="direct-chat-msg right">
							<div className="direct-chat-info clearfix">
								<span className="direct-chat-name pull-right">
									Sarah Bullock
								</span>
								<span className="direct-chat-timestamp pull-left">
									23 Jan 6:10 pm
								</span>
							</div>
							{/* /.direct-chat-info */}
							<img
								className="direct-chat-img"
								src="assets/dist/img/user3-128x128.jpg"
								alt="message user image"
							/>
							{/* /.direct-chat-img */}
							<div className="direct-chat-text">
								I would love to.
							</div>
							{/* /.direct-chat-text */}
						</div>
						{/* /.direct-chat-msg */}
					</div>
				</div>
				<div className="box-footer">
					<form action="#" method="post">
						<div className="input-group">
							<input
								type="text"
								name="message"
								placeholder="Type Message ..."
								className="form-control"
							/>
							<span className="input-group-btn">
								<button
									type="button"
									className="btn btn-primary btn-flat"
								>
									Send
								</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
export default Chat;
