 import React from 'react';
 import { StyleSheet } from 'react-native'
 import { Container, Header, Title, Content, Button, Icon, Left,Right,Card, CardItem, Body, Text } from "native-base";
 const VacationComponent = (props) => (
        
        <Card style={styles.card}>
            <CardItem  style={{justifyContent:"space-between"}}>
                <Text style={{fontWeight:"bold",fontSize:18}}>Travelling Vacation</Text>
                <Button transparent>
                    <Icon name='close' style={{color: 'red'}}/>
                </Button>
            </CardItem>
            <CardItem>
            <Body >
                <Text style={{color:"green"}}>
                    From: 18/13/2019
                </Text>
                <Text style={{color:"red"}}>
                    To: 19/12/2019
                </Text>
                <Text style={styles.desc}>
                    This is similar to how you would customize a stack navigator — there are some properties.
                </Text>
            </Body>
            </CardItem>
            <CardItem style={{justifyContent:"flex-end"}} >
                <Button style={styles.status_buttons} small warning>
                    <Text uppercase={false} > Pending </Text>
                </Button>
            </CardItem>
    </Card>
 );
 
 const styles = StyleSheet.create({
    card:{
       margin:10
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
 