import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { D } from '../../variable/dimension'
export class feedDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            data : null,

        }
    }

    componentDidMount(){
        console.log(this.props.route.params)
        this.setState({data : this.props.route.params.data})
    }

    imagePerview(){
        return(
            <View>
                <ImageBackground imageStyle={{borderRadius : 50}} source={{uri : this.state.data.media.m}} style={{width : '100%',height : D.height*55/100}}>
                    <View style={{paddingTop : 35,paddingHorizontal : D.width*5/100}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.pop()
                        }}>
                            <View style={style.buttonContainer}>
                                <Icon name={'arrow-left'} color={'white'} size={20}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    commentContainer(){
        return(
            <View style={{backgroundColor : 'white',borderTopLeftRadius : 20, borderTopRightRadius : 20,height : 100,padding : 20}}>
                <Text>asdasd</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex : 1, backgroundColor : 'white'}}>
                {/* <Text>feedDetail.js</Text> */}
                {(this.state.data!==null)?this.imagePerview():null}
                <View style={{bottom:20}}>
                    {this.commentContainer()}
                    {/* <Text>asdad</Text> */}
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    buttonContainer : {
        padding : 10,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : "rgba(0,0,0,0.3)",
        borderRadius : 50,
        alignSelf : 'flex-start'
    }
})

export default feedDetail
