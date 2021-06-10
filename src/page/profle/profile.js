import React, { Component } from 'react'
import { 
    View,
    Text
} from 'react-native'

export class profile extends Component {
    constructor(prosp){
        super(prosp)
        this.state={

        }
    }

    searchRender(){
        return(
            <View>
                <Text>Search</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                <View>
                    {this.searchRender()}
                </View>
            </View>
        )
    }
}

export default profile
