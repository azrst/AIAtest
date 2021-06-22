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
            data : this.props.user.savePost,
            dataTemp : [],
        }
    }

    componentDidMount(){
        // console.log(this.props.user.savePost)
    }

    filterData = async (val) =>{
        this.setState({dataTemp : []},()=>{
            this.state.data.map((item,index)=>{
                let tag = item.tags.toString().toLowerCase()
                if(tag.includes(val)){
                    console.log(item.tags)
                }
                // if(item.tags.includes(val) ){
                //     console.log('index : ',index,item.tags)
                // }
            })
        })
    }

    searchRender(){
        return(
            <View style={[style.shadow,{backgroundColor : 'white',borderRadius : 10,alignSelf : 'stretch',paddingVertical : 5,paddingHorizontal : 20}]}>
                <TextInput
                    style={{paddingVertical : 10}}
                    placeholder={'Search Photo by tags ...'}
                    value={this.state.inputTags}
                    onChangeText={(val)=>{
                        // this.filterData(val)
                        console.log('tag : ', val)
                        this.setState({inputTags : val})
                    }}
                />
            </View>
        )
    }

    imageThumb2(){
        return(
            <View style={{flexDirection : "row",flexWrap : 'wrap' ,paddingBottom:200}}>
                {this.state.data.map((item,index)=>{
                    let tag = item.tags.toString().toLowerCase()

                    if(this.state.inputTags == ''){
                        return(
                            <View>
                                {this.imageFlatlist(item,index)}
                            </View>
                        )
                    }
                    else if(this.state.inputTags != '' && tag.includes(this.state.inputTags.toLowerCase()) ){
                        return(
                            <View>
                                {this.imageFlatlist(item,index)}
                            </View>
                        )
                    }

                    // else if(this.state.inputTags != '' && item.tags.includes(this.state.inputTags) ){
                    //     return(
                    //         <View style={{paddingTop : 20}}>
                    //             {/* {this.imageFlatlist(item,index)} */}
                    //             <Text>{index}</Text>
                    //         </View>
                    //     )
                    // }
                })}
            </View>
        )
    }
    imageFlatlist(item,index){
        return(
            <View style={{}}>
                <Image source={{uri : item.media.m}} style={{width : D.width * 30/100, height : D.width * 30/100,marginRight : D.width*2/100,marginBottom : D.width*2/100}}/>
            </View>
        )
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
