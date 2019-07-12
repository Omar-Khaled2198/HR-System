import React, { Component } from 'react'
import { Text, View } from 'react-native'

class HomeScreen extends Component {
    
    static navigationOptions = { header: null };
    render() {
        return (
            <View>
                <Text> HomeScreen </Text>
            </View>
        )
    }
}

export default HomeScreen;
