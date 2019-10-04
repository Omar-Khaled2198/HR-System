import React from 'react';
import moment from 'moment';
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
                    Deadline: {moment(props.data.deadline).format('YYYY/MM/DD h:mm a')}
                </Text>
                <Text style={{color: "green"}}>
                    Done: {moment(props.data.done).format('YYYY/MM/DD h:mm a')}
                </Text>
            </Body>
        </CardItem>
    </Card>
);

export default TaskDoneComponent;
