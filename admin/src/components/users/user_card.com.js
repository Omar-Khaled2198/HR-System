import React from 'react'
import {Link} from "react-router-dom";


function UserCard(props) {
	const {data} = props
    return (
     
      <div className="box box-primary ">
		<div className="box-body box-profile">
			<img className="profile-user-img img-responsive img-circle" src="/assets/dist/img/user4-128x128.jpg" alt="User profile picture" />
			<h3 className="profile-username text-center">{data.profile.first_name+" "+data.profile.last_name}</h3>
			<p className="text-muted text-center">{data.profile.job_title}</p>
			<ul className="list-group list-group-unbordered">
				<li className="list-group-item text-muted text-center">
					<a>{data.email}</a>
				</li>
			</ul>
			<Link to={{
					pathname: `/admin/users/${data._id}/profile`,
					state: {
						data
					}
				}}>
				<button href="#" className="btn btn-primary btn-block"><b>View Profile</b></button>
				</Link>
		</div>
    </div>
    )
}

export default UserCard;
