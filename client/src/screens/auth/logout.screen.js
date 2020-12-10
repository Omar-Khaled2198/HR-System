import React, { Component } from "react";
import StorageManager from "../../utils/storage_manager.utils";
import { View } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
class Logout extends Component {
	static navigationOptions = { header: null };
	
	constructor(props){
		super(props)
		this.state = {
			is_loading:false
		}
	}
	async componentDidMount() {
		this.setState({is_loading:true})
        await StorageManager.Delete("account");
		global.account = null;
		this.setState({is_loading:false})
		this.props.navigation.navigate("Login");
	}

	render() {
		return (
			<View>
				<Spinner visible={this.state.is_loading} />
			</View>
		);
	}
}

export default Logout;
