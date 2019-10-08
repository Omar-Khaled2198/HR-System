import React, { Component } from 'react'
import NavBar from '../components/navbar/navbar.com';
import SideBar from '../components/sidebar/sidebar.com';
import Footer from '../components/footer.com';
import Timeline from '../components/timeline/timeline.com';
import UsersList from '../components/users/users_list.com';
import UserProfile from '../components/users/user_profile.com';
import {Route} from "react-router-dom";
import VacationsTabs from '../components/vacations/vacations_tabs.com';
import TasksTabs from '../components/tasks/tasks_tabs.com';
import UserCreate from '../components/users/user_create.com';
import VacationRespond from '../components/vacations/vacation_respond.com';
import TaskCreate from '../components/tasks/task_create.com';
import TaskUpdate from '../components/tasks/task_update.com';
import TaskView from '../components/tasks/task_view.com';
import VacationView from '../components/vacations/vacation_view.com';

class HomePage extends Component {
    

    async componentDidMount(){
        
    }
    render() {
        return (

            <div className="wrapper hold-transition skin-blue sidebar-mini">
              <NavBar/>
              {/* Left side column. contains the logo and sidebar */}
              <SideBar/>
              {/* Content Wrapper. Contains page content */}
              <div className="content-wrapper">
                    {/* Content Start */}
                        <Route exact path={'/admin'} component={Timeline} />
                        <Route exact path={'/admin/users'} component={UsersList} />
                        <Route exact path={'/admin/users/:id/profile'} component={(props)=><UserProfile {...props}/>}/>
                        <Route exact path={'/admin/users/new'} component={UserCreate}/>
                        <Route exact path={'/admin/vacations'} component={VacationsTabs} />
                        <Route exact path={'/admin/vacations/:id/update'} component={(props)=><VacationRespond {...props}/>}/>
                        <Route exact path={'/admin/vacations/:id/view'} component={VacationView}/>
                        <Route exact path={'/admin/tasks'} component={TasksTabs} />
                        <Route exact path={'/admin/tasks/:id/view'} component={TaskView} />
                        <Route exact path={'/admin/tasks/new'} component={TaskCreate} />
                        <Route exact path={'/admin/tasks/:id/update'} component={(props)=><TaskUpdate {...props}/>}/>

                    {/* Content End */}
                </div>
              {/* /.content-wrapper */}
              <Footer/>
            </div>
        )
    }
}

export default HomePage;
