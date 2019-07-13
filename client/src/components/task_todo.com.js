import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Title,SwipeRow, View, Content, Button, Icon, Left,Right,Card, CardItem, Body, Text } from "native-base";
const TaskToDoComponent = () => {
    return (
        <SwipeRow
                leftOpenValue={75}
                left={
                <Button success onPress={() => alert('Add')}>
                    <Icon active name="add" />
                </Button>
                }
                body={
                <View style={{marginLeft:20}}>
                     <Text style={{fontWeight:"bold",fontSize:18}}>
                        Title
                    </Text>
                    <Text>
                        Delta compression using up to 4 threads.
                    </Text>
                    <Text style={{color:"red"}}>
                        Deadline: 18/12/2019
                    </Text>
                </View>
                }
            />
    )
}
const styles = StyleSheet.create({
})
export default TaskToDoComponent
