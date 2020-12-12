import React from "react";
import VacationCard from "./vacation_card.com";

function VacationsList(props) {
	const { requests } = props;
	return (
		<div>
			<div className="row row-eq-height">
				{requests.map(request => {
					return (
						<div key={request._id} className="col-md-4 ">
							<VacationCard request={request}/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default VacationsList;
