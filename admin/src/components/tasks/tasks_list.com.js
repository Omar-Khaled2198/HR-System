import React from "react";

import TaskCard from "./task_card.com";

function TasksList(props) {
	const {list} = props
	return (
		<div>
			<div className="row">
				{
					list.map(task=>{
						return(
							<div className="col-md-4">
								<TaskCard data={task}/>
							</div>
						)
					})
				}
			</div>
		</div>
	);
}

export default TasksList;
