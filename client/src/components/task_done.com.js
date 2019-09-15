import React from 'react';
import {Card, CardItem, Body, Text} from "native-base";

const TaskDoneComponent = (props) => (

    <Card>
        <CardItem>
            <Body>
                <Text style={{fontWeight: "bold", fontSize: 18}}>
                    {props.data.title}
                </Text>
                <Text>
                    {props.data.description}
                </Text>
                <Text style={{color: "green"}}>
                    Deadline: {props.data.deadline}
                </Text>
            </Body>
        </CardItem>
    </Card>
);

export default TaskDoneComponent;
