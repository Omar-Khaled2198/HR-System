import React from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import {Container, Header, Title, Right, View, Content, Button, Icon, Left, Body, Text} from "native-base";
import FirebaseHandler from '../../utils/firebase_handler.util';
import moment from 'moment';
class FeedbackScreen extends React.Component {
    state = {
        messages: [],
    }

    async componentDidMount() {
        await this.GetMessages();
        this.ListenToMessages();
    }

    async GetMessages(){
		var messages = []
		const snapshots = await FirebaseHandler.ReadOnce(`feedback/${global.account._id}`);
		snapshots.forEach((childNodes)=>{
				messages.push(this.MessageMapper(childNodes.val(),childNodes.key));
        })
		this.setState({messages:messages.reverse()});
	}

	ListenToMessages(){
		FirebaseHandler.Listen(`feedback/${global.account._id}`,(snapshot)=>{
            console.log(snapshot);
			this.setState({messages:[this.MessageMapper(snapshot.val(),snapshot.key),...this.state.messages]});	
		})
		
    }
    
    MessageMapper(message,key){
        const object =
            {
                    _id:key,
                    text:message.msg,
                    user:{
                        _id:message.owner
                    },
                    createdAt: moment.unix(message.at).format("DD MMM, YYYY hh:mm a")
            }
        return object
    }

    onSend(message) {
        const messageObject = {
			msg: message[0].text,
			owner: global.account._id,
			at: moment().unix()
        }
		FirebaseHandler.Write(`feedback/${global.account._id}`,messageObject);
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <Header>
                    <Left style={{flex: 1}}/>
                    <Body style={{flex: 1}}>
                        <Title style={{alignSelf: "center"}}>Feedback</Title>
                    </Body>
                    <Right style={{flex: 1}}/>
                </Header>
                <View style={{flex: 1}}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        showUserAvatar={false}
                        user={{
                            _id: global.account._id,
                        }}
                    />
                </View>
            </Container>

        )
    }
}

export default FeedbackScreen;