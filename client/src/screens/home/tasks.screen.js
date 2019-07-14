import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Title, Content, Button, Icon, Left,Right,Card, CardItem, Body, Text,Tab, Tabs } from "native-base";
import TaskToDoComponent from "../../components/task_todo.com";
import TaskDoneComponent from "../../components/task_done.com";
class TasksScreen extends Component {

    static navigationOptions = { header: null };
    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left style={{flex:1}}/>
                    <Body style={{flex:1}}> 
                        <Title style={{ alignSelf: "center" }}>Tasks</Title>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                <Tabs locked>
                    <Tab heading="To Do">
                        <TaskToDoComponent/>
                    </Tab>
                    <Tab heading="Done">
                        <TaskDoneComponent/>
                    </Tab>
                </Tabs>
                <Content>
                    
                </Content>
            </Container>
        )
    }
}


export default TasksScreen;
