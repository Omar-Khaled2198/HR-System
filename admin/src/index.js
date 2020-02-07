import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "ionicons";
import "font-awesome/css/font-awesome.min.css";

import jquery from 'jquery';
window.$ = window.jQuery= jquery;
require("bootstrap/dist/js/bootstrap.min");

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
