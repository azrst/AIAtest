import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
export class splash extends Component {
    render() {
        return (
            <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Home')
                }}>
                <Text>splash.js</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default splash
