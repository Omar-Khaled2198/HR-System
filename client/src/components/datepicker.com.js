import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Input, Item } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
const DatePickerComponent = (props) => {
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());
	const showDatepicker = () => {
		setShow(true);
	};
	return (
		<View>
			<View >
				<Item rounded style={styles.date_picker}>
					<Input
						placeholder={props.placeholder}
						onTouchStart={showDatepicker}
						value={date}
					/>
				</Item>
			</View>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={new Date()}
					mode="date"
					is24Hour={false}
					display="default"
					onChange={(event, selectedDate) => {
						setShow(false);
						setDate(moment(selectedDate).format("YYYY/MM/DD"));
						props.onChangeDate(selectedDate);
					}}
				/>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	date_picker: {
		marginBottom: 20,
		width: "100%",
		paddingLeft:10
		
	},
});
export default DatePickerComponent;
