import React, { Component } from 'react'
import { 
    View,
    Text,
    FlatList,
    Image
} from 'react-native'
import {connect} from 'react-redux'
import { D } from '../../variable/dimension'

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

            </View>
        )
    }

    imageThumb(){
        return(
            <View>
                <FlatList
                    data={this.props.user.savePost}
                    contentContainerStyle={{flexDirection : "row", flexWrap : "wrap",paddingBottom:120}}
                    numColumns ={3}
                    keyExtractor={(item,index) => index}
                    renderItem={({item,index})=>{
                        return(
                            <View style={{}}>
                                <Image source={{uri : item.media.m}} style={{width : D.width * 30/100, height : D.width * 30/100,marginRight : D.width*2/100,marginBottom : D.width*2/100}}/>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{paddingTop : 30}}>
                <View style={{paddingLeft : D.width*2/100}}>
                    {this.imageThumb()}
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({user}) => ({
    user: user,
});

export default connect(mapStateToProps)(Profile);
