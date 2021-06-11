import React, { Component } from 'react'
import { 
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    ScrollView,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import { D } from '../../variable/dimension'

export class Profile extends Component {
    constructor(prosp){
        super(prosp)
        this.state={
            inputTags : '',
            data : this.props.user.savePost
        }
    }

    componentDidMount(){
        // console.log(this.props.user.savePost)
    }

    searchRender(){
        return(
            <View style={[style.shadow,{backgroundColor : 'white',borderRadius : 10,alignSelf : 'stretch',paddingVertical : 5,paddingHorizontal : 20}]}>
                <TextInput
                    placeholder={'Search Photo by tags ...'}
                    value={this.state.inputTags}
                    onChangeText={(val)=>{
                        console.log('tag : ', val)
                        this.setState({inputTags : val})
                    }}
                />
            </View>
        )
    }
    imageThumb(){
        return(
            <View>
                <FlatList
                    data={this.props.user.savePost}
                    contentContainerStyle={{flexDirection : "column",paddingBottom:200}}
                    numColumns ={3}
                    keyExtractor={(item,index) => index}
                    renderItem={({item,index})=>{
                        return(
                            <View>
                                {this.imageFlatlist(item,index)}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    imageThumb2(){
        return(
            <View style={{flexDirection : "row",flexWrap : 'wrap' ,paddingBottom:200}}>
                {this.state.data.map((item,index)=>{
                    return(
                        <View>
                            {this.imageFlatlist(item,index)}
                        </View>
                    )
                })}
            </View>
        )
    }
    imageFlatlist(item,index){
        if(item.tags.includes(this.state.inputTags)){
            return(
                <View style={{}}>
                    <Image source={{uri : item.media.m}} style={{width : D.width * 30/100, height : D.width * 30/100,marginRight : D.width*2/100,marginBottom : D.width*2/100}}/>
                </View>
            )
        }else if(this.state.inputTags == ''){
            return(
                <View style={{}}>
                    <Image source={{uri : item.media.m}} style={{width : D.width * 30/100, height : D.width * 30/100,marginRight : D.width*2/100,marginBottom : D.width*2/100}}/>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{paddingTop : 30}}>
                <View style={{paddingHorizontal : D.width*2/100,paddingTop : 20}}>
                    {this.searchRender()}
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingLeft : D.width*2/100,paddingTop : 20}}>
                        {this.imageThumb2()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({user}) => ({
    user: user,
});


const style = StyleSheet.create({
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    shadowLight : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        
        elevation: 3,
    }
})

export default connect(mapStateToProps)(Profile);
