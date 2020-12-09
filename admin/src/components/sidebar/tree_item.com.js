import React from "react";
import { Link } from "react-router-dom";

function TreeItem(props) {
	return (
		<li className="treeview">
			
			<a href="#" style={{ color: "#b8c7ce",textDecoration:"none" }}>
				<i className={props.icon} /> <span>{props.name}</span>
				<span className="pull-right-container">
					<i className="fa fa-angle-left pull-right" />
				</span>
			</a>
			<ul className="treeview-menu">
				{props.tree_items.map(tree_item => (
					<Link to={tree_item.to}>
						<li style={{padding:"5px",paddingLeft:"20px"}}>
							<span>
								<i className={tree_item.icon} style={{marginRight:"5px"}} />{" "}
								{tree_item.name}
							</span>
						</li>
					</Link>
				))}
			</ul>
		</li>
	);
}

export default TreeItem;
