import React from "react";

function VacationAccept(props) {
	
	const {request} = props
	return (
		<div
			className="modal fade in"
			style={true?{display: "block",paddingRight:"15px"}:{display: "none"}}
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span>×</span>
						</button>
						<h4 className="modal-title">Accept Vacation Request</h4>
					</div>
					<div className="modal-body">
						<p>Are you sure you want to accept this vacation?</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger pull-left"
							data-dismiss="modal"
						>
							Cancel
						</button>
						<button type="button" className="btn btn-success">
							Accept
						</button>
					</div>
				</div>
				{/* /.modal-content */}
			</div>
			{/* /.modal-dialog */}
		</div>
	);
}

export default VacationAccept;
