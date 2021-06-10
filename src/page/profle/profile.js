import React, { Component } from 'react'
import { 
    View,
    Text
} from 'react-native'
import {connect} from 'react-redux'

export class Profile extends Component {
    constructor(prosp){
        super(prosp)
        this.state={

        }
    }

    componentDidMount(){
        console.log(this.props.user.savePost)
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

const mapStateToProps = ({user}) => ({
    user: user,
});

export default connect(mapStateToProps)(Profile);
