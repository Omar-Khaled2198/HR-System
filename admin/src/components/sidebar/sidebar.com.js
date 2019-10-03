import React from 'react'
import Search from './search_form.com';
import SingleItem from './single_item.com';
import { Link } from 'react-router-dom';
import TreeItem from './tree_item.com';

function SideBar() {

    return (
        <div>
            <aside className="main-sidebar">
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">
                  {/* Sidebar user panel */}
                  	{/* <div className="user-panel">
						<div className="pull-left image">
						<img src="assets/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
						</div>
						<div className="pull-left info">
						<p>HR</p>
						<a href="#"><i className="fa fa-circle text-success" /> Online</a>
						</div>
                  	</div> */}
					{/* search form */}
					{/* <Search/> */}
					{/* /.search form */}
					{/* sidebar menu: : style can be found in sidebar.less */}
                  	<ul className="sidebar-menu" data-widget="tree">
				  	    <SingleItem icon="fa fa-home" name="Home" to="/admin"/>
                    	<SingleItem icon="fa fa-users" name="Users" to="/admin/users"/>
                   		<SingleItem icon="fa fa-pause" name="Vacations" to="/admin/vacations"/>
						<SingleItem icon="fa fa-tasks" name="Tasks" to="/admin/tasks"/>
                    {/* <SingleItemComponent icon="fa fa-tasks" name="Tasks"/> */}
                  	</ul>
                </section>
                {/* /.sidebar */}
			</aside>
        </div>
    )
}

export default SideBar;