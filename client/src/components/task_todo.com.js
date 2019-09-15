import React from 'react'
import {StyleSheet} from 'react-native'
import {
    Container,
    Header,
    Title,
    SwipeRow,
    View,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Card,
    CardItem,
    Body,
    Text
} from "native-base";

const TaskToDoComponent = (props) => {
    return (
        <SwipeRow
            leftOpenValue={75}
            left={
                <Button success onPress={() => props.done(props.data._id,props.index)}>
                    <Icon active name="add"/>
                </Button>
            }
            body={
                <View style={{marginLeft: 20}}>
                    <Text style={{fontWeight: "bold", fontSize: 18}}>
                        {props.data.title}
                    </Text>
                    <Text>
                        {props.data.description}
                    </Text>
                    <Text style={{color: "red"}}>
                        Deadline: {props.data.deadline}
                    </Text>
                </View>
            }
        />
    )
}
const styles = StyleSheet.create({})
export default TaskToDoComponent
