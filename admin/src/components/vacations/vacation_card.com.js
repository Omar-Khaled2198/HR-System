import React from 'react'
import {Link} from "react-router-dom"
function VacationCard(props) {

	const {request} = props

    return (
        <div className="box box-primary box-solid">
            <div className="box-header box-warning">
                <h2 className="box-title text-bold">{request.requester.profile.first_name+" "+request.requester.profile.last_name}</h2>
				{/* <h4>{created_at}</h4> */}
            </div>
            <div className="box-body">
				<dl>
					<div style={{width:"inherit",fontSize:"16px",wordWrap: "break-word"}}>
						<dt>{request.title}</dt>
					</div>
					<br/>
					<dt><i className="fa fa-circle-o text-green"></i> From: {request.from}</dt>
					<br/>
					<dt><i className="fa fa-circle-o text-red"></i> To: {request.to}</dt>
					<br/>
					<div style={{width:"inherit",wordWrap: "break-word"}}>
						<p>{request.description}</p>
					</div>
				</dl>
				<Link to={`/admin/vacations/${request._id}/view`}>View</Link>
				<Link to={{
					pathname: `/admin/vacations/${request._id}/update`,
					state: {
						request
					}
				}}>
					<button type="button" className="btn btn-primary pull-right">Respond</button>
				</Link>
            </div>
      	</div>
    )
}

export default VacationCard;