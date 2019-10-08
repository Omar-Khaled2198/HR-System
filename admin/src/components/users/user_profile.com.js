import React, { Component } from 'react'
import Table from '../tables/table.com';
import Chat from './chat/chat.com';
import ServiceProvider from '../../utils/service_provider.utils';
import { API_BASE_URL } from '../../utils/constants.utils';
import TableMapper from '../../utils/table_mapper.utils';
import ReactTable from "react-table";
import "react-table/react-table.css";

class UserProfile extends Component {
    

    constructor(props) {
		super(props);
		this.state = {
            account:{},
            is_loading: true
		};
	}

	async componentDidMount() {
		var account = {}
        if(this.props.history.location.state){
            account = this.props.history.location.state.data
        } else {
            const response = await ServiceProvider.GET(
                `/accounts/${this.props.match.params.id}`
            );
            account = response.data;
        }
        const vacations_response = await ServiceProvider.GET(
            `/vacations?requester=${this.props.match.params.id}`
        )
        const tasks_response = await ServiceProvider.GET(
            `/tasks?assigned_to=${this.props.match.params.id}`
        )
        this.setState({
            account: account,
            vacations: vacations_response.data,
            tasks: tasks_response.data,
            is_loading:false
        })
		
    }
    
    render() {
        return (

            <div>
                <section className="content-header">
                        <h1>User Profile</h1>
                    </section>
                    {!this.state.is_loading&&
                    <section className="content">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="box box-primary">
                                <div className="box-body box-profile">
                                    <img className="profile-user-img img-responsive img-circle" src="/assets/dist/img/user4-128x128.jpg" alt="User profile picture" />
                                    <h3 className="profile-username text-center">{this.state.account.profile.first_name+" "+this.state.account.profile.last_name}</h3>
                                    <p className="text-muted text-center">{this.state.account.profile.job_title}</p>
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                        <b>Vacations</b> <a className="pull-right">1,322</a>
                                        </li>
                                        <li className="list-group-item">
                                        <b>Tasks</b> <a className="pull-right">543</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <Chat/>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="nav-tabs-custom">
                                <ul className="nav nav-tabs">
                                    <li className="active"><a href="#tab_1" data-toggle="tab">Vacations</a></li>
                                    <li><a href="#tab_2" data-toggle="tab">Tasks</a></li>
                                </ul>
                                <div className="tab-content" >
                                    <div className="tab-pane active" id="tab_1">
                                    <div
											style={{ backgroundColor: "white" }}
										>
											{!this.state.is_loading && (
												<ReactTable
													data={this.state.vacations}
													columns={TableMapper("VACATIONS")}
													minRows={0}
												/>
											)}
										</div>
                                    </div>
                                    <div className="tab-pane" id="tab_2">
                                        <div
											style={{ backgroundColor: "white" }}
										>
											{!this.state.is_loading && (
												<ReactTable
													data={this.state.tasks}
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
                </section>}
            </div>
        )
    }
}

export default UserProfile;
