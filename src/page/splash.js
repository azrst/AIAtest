import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
export class splash extends Component {

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.replace('Home')
        },1000)
    }

    render() {
        return (
            <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.replace('Home')
                }}>
                <Text>splash.js</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default splash
