import React from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker'

const DatePickerComponent = (props) => (
    
    <DatePicker
            style={styles.date_picker}
            mode="date"
            placeholder={props.placeholder}
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                placeholderText:{
                    alignSelf:"flex-start",
                    marginLeft: 10,
                    color:"dimgray",
                    fontSize:17,
                },
                dateIcon:{
                    display:"none"
                },
                dateInput:{
                    borderColor:"lightgray"
                }
            }}
            />
);
const styles = StyleSheet.create({
    date_picker:{
        marginTop:20,
        width:"100%"
    }
})
export default DatePickerComponent;
