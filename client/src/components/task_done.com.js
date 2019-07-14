import React from 'react';
import {Card, CardItem, Body, Text } from "native-base";

const TaskDoneComponent = (props) => (

        <Card>
            <CardItem>
                    <Body>
                        <Text style={{fontWeight:"bold",fontSize:18}}>
                            Title
                        </Text>
                        <Text>
                            Delta compression using up to 4 threads.
                        </Text>
                        <Text style={{color:"green"}}>
                            Deadline: 18/12/2019
                        </Text>
                    </Body>
            </CardItem>
        </Card>
);

export default TaskDoneComponent;
