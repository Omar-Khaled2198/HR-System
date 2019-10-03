import React from 'react'

function TreeItem(props) {
    return (
        <li className="treeview">
            <a style={{color:"#b8c7ce"}}>
                <i className={props.icon} /> <span>{props.name}</span>
                <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                </span>
            </a>
            <ul className="treeview-menu">
                {props.tree_items.map(tree_item=>(
                 <li><a href="pages/forms/general.html"><i className={tree_item.icon} /> {tree_item.name}</a></li>   
                ))}
            </ul>
      </li>
    )
}

export default TreeItem;
