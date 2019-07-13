import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Title, Content, Button, Icon, Left,Right,Card, CardItem, Body, Text,Tab, Tabs } from "native-base";
import TaskToDo from "../../components/task_todo.com";

class TasksScreen extends Component {

    static navigationOptions = { header: null };
    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left style={{flex:1}}>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body style={{flex:1}}> 
                        <Title style={{ alignSelf: "center" }}>Tasks</Title>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                <Tabs locked>
                    <Tab heading="To Do">
                        <TaskToDo/>
                    </Tab>
                    <Tab heading="Done">
                        <Text>text2</Text>
                    </Tab>
                </Tabs>
                <Content>
                    
                </Content>
            </Container>
        )
    }
}


export default TasksScreen;
