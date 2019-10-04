import React, { Component } from "react";
import StorageManager from "../../utils/storage_manager.utils";
import { View } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
class Logout extends Component {
	static navigationOptions = { header: null };

	async componentDidMount() {
        await StorageManager.Delete("account");
        global.account = null;
		this.props.navigation.navigate("Login");
	}

	render() {
		return (
			<View>
				<Spinner visible={true} />
			</View>
		);
	}
}

export default Logout;
