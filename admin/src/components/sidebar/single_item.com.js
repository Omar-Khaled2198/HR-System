import React from "react";
import { Link } from 'react-router-dom';

function SingleItem(props) {
	return (
		<li>
			<a>
				<Link to={props.to}>
					<i className={props.icon} style={{paddingRight:"15px"}}/> 
					<span>
						{props.name}
					</span>
					</Link>
				{/* <span className="pull-right-container">
					<small className="label pull-right bg-red">3</small>
					<small className="label pull-right bg-blue">17</small>
				</span> */}
			</a>
		</li>
	);
}

export default SingleItem;
