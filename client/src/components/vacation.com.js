 import React from 'react';
 import { StyleSheet } from 'react-native'
 import { Container, Header, Title, Content, Button, Icon, Left,Right,Card, CardItem, Body, Text } from "native-base";
 
 const VacationComponent = (props) => (
        
        <Card style={styles.card}>
            <CardItem  style={{justifyContent:"space-between"}}>
                <Text style={{fontWeight:"bold",fontSize:18}}>{props.data.title}</Text>
                <Button transparent onPress={()=>props.abort(props.data._id)}>
                    <Icon name='close' style={{color: 'red'}}/>
                </Button>
            </CardItem>
            <CardItem>
            <Body >
                <Text style={{color:"green"}}>
                    From: {props.data.from}
                </Text>
                <Text style={{color:"red"}}>
                    To: {props.data.to}
                </Text>
                <Text style={styles.desc}>
                    {props.data.description}
                </Text>
            </Body>
            </CardItem>
            <CardItem style={{justifyContent:"flex-end"}} >
                <Button style={styles.status_buttons} small 
                                                      warning={props.data.status=="Pending"}
                                                      danger={props.data.status=="Rejected"}
                                                      dark={props.data.status=="Aborted"}
                                                      success={props.data.status=="Accepted"}>
                    <Text uppercase={false} > {props.data.status} </Text>
                </Button>
            </CardItem>
    </Card>
 );
 
 const styles = StyleSheet.create({
    card:{
       marginLeft:15,
       marginRight:15,
       marginTop:10
    },
    status_buttons:{
        marginLeft:10,
        alignSelf:"flex-end"
    },
    desc:{
        marginTop:10,
    }
})

 export default VacationComponent;
 