import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { D } from '../../variable/dimension'
import {colors} from '../../variable/color'

export class feedDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            data : null,
            height : null,
            width : null, 
            heightMod : 100
        }
    }

    componentDidMount(){
        console.log(this.props.route.params)
        this.setState({data : this.props.route.params.data})
        Image.getSize(this.props.route.params.data.media.m,(height,width)=>{
            console.log(width,height)
            this.setState({heightMod : height* (D.width/width) })
        })
    }

    imagePerview(){
        return(
            <View>
                <ImageBackground imageStyle={{resizeMode : 'contain'}} source={{uri : this.state.data.media.m}} style={{width : '100%',height : this.state.heightMod}}>
                </ImageBackground>
            </View>
        )
    }

    header(){
        return(
            <View>
                <View style={{paddingTop : 35,paddingHorizontal : D.width*5/100}}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.pop()
                    }}>
                        <View style={style.buttonContainer}>
                            <Icon name={'arrow-left'} color={'white'} size={20}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex : 1, backgroundColor : 'black'}}>
                <View>
                    {this.header()}
                </View>
                <View style={{flex : 1,justifyContent : 'center'}}>
                    {(this.state.data!==null)?this.imagePerview():null}
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
        backgroundColor : "rgba(255,255,255,0.3)",
        borderRadius : 50,
        alignSelf : 'flex-start'
    }
})

export default feedDetail
