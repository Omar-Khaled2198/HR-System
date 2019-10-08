import React from 'react'
import moment from "moment"
function TimelineItem(props) {
    const {event} = props
    return (
        
        <li>
        <i className="fa fa-user bg-aqua" />
        <div className="timeline-item">
          <span className="time"><i className="fa fa-clock-o" /> {moment.unix(event.at).format("hh:mm a")}</span>
          <h3 className="timeline-header no-border"><a href="#">{event.user.name}</a> {event.action}</h3>
        </div>
      </li>
    )
}

export default TimelineItem
