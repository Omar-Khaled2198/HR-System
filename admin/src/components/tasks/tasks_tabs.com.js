import React,{Component} from 'react'
import Table from '../tables/table.com';
import TasksList from './tasks_list.com';
import ServiceProvider from '../../utils/service_provider.utils';
import { API_BASE_URL } from '../../utils/constants.utils';
import ReactTable from "react-table";
import "react-table/react-table.css";
import TableMapper from "../../utils/table_mapper.utils";
import {Link} from "react-router-dom"

class TasksTabs extends Component{

	constructor(props) {
		super(props);
		this.state = {
			current_tasks: [],
			done: [],
			is_loading: true
		};
	}

	async componentDidMount() {
		const response = await ServiceProvider.GET(
			`/tasks`
		);
		const tasks = response.data;
		var current_tasks = [],
			done = [];
		if (response.status == 200) {
			tasks.map(task => {
				if (task.status == "Done") {
					done.push(task);
				} else {
					current_tasks.push(task);
				}
			});
			this.setState({ current_tasks, done, is_loading:false });
		}
	}

    render(){
		return (
			<div>
			  <section className="content-header">
					<h1>Tasks 
						<Link to={"/admin/tasks/new"}>
							<span className="btn btn-primary pull-right text-bold">New Task</span>
						</Link>
					</h1>
			  </section>
			  <section className="content">
				  <div className="row">
					  <div className="col-md-12">
						  <div className="nav-tabs-custom" style={{background:"transparent",boxShadow:"none"}}>
							  <ul className="nav nav-tabs">
								  <li className="active"><a href="#tab_1" data-toggle="tab">Tasks</a></li>
								  <li><a href="#tab_2" data-toggle="tab">History</a></li>
							  </ul>
							  <div className="tab-content" style={{background:"transparent"}} >
								  <div className="tab-pane active" id="tab_1">
									  {!this.state.is_loading && (
											<TasksList list={this.state.current_tasks}/>
										)}
								  </div>
								  <div className="tab-pane" id="tab_2">
									<div
												style={{ backgroundColor: "white" }}
											>
												{!this.state.is_loading && (
													<ReactTable
														data={this.state.done}
														columns={TableMapper("TASKS")}
														minRows={0}
													/>
												)}
											</div>
									</div>
							  </div>
						  </div>
					  </div>
				  </div>
			  </section>
		  </div>
		
	  )
	}
}

export default TasksTabs