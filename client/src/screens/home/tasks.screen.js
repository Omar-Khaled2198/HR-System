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
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tasks</Title>
                    </Body>
                    <Right/>
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
