import React from 'react'
import { Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";

function Routes() {
    return (
        <div>
            <Route exact path="/" component={LoginPage}/>
		    <Route path="/admin" component={HomePage} />
        </div>
    )
}

export default Routes
