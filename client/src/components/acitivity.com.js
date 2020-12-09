import React, { Component } from "react";
import { View, Text, StyleSheet,Dimensions } from "react-native";
import { Spinner } from "native-base";


const Activity = props => {
	return (
		<View style={styles.view}>
			{props.loading && (
				<View style={styles.container}>
					<Spinner color="blue" style={styles.spinner}/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({

});

export default Activity;
