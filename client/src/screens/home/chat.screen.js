import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Container, Header, Title,Right,View, Content, Button, Icon, Left, Body, Text } from "native-base";
class ChatScreen extends React.Component {
  state = {
    messages: [],
  }
 
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'HR',
          },
        },
      ],
    })
  }
 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
 
  render() {
    return (
        <Container style={{ flex: 1 }}>
        <Header>
                <Left style={{flex:1}}/>
                <Body style={{flex:1}}>
                    <Title style={{ alignSelf: "center" }}>Feedback</Title>
                </Body>
                <Right style={{flex:1}}/>
        </Header>
        <View style={{ flex: 1 }}>
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            showUserAvatar={false}
            user={{
            _id: 1,
            }}
        />
        </View>
      </Container>
      
    )
  }
}

export default ChatScreen;