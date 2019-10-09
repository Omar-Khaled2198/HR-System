import React from 'react'
import moment from 'moment';

function Message(props) {

	const {content} = props
    return (
		<div className={`direct-chat-msg ${props.position=="right"?"right":""}`}>
			<div className="direct-chat-info clearfix" >
				<span className={`direct-chat-timestamp ${props.position=="right"?"pull-left":"pull-right"}`}>
					{moment.unix(content.at).format("DD MMM, YYYY hh:mm a")}
				</span>
			</div>
			<div className="direct-chat-text" style={{ margin: 0 }}>
				{content.msg}
			</div>
		</div>
	);
}

export default Message
