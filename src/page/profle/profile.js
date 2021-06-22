import React, { Component } from 'react'
import { 
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    Animated,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import {connect} from 'react-redux'
import { colors } from '../../variable/color'
import { D } from '../../variable/dimension'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export class Profile extends Component {
    constructor(prosp){
        super(prosp)
        this.state={
            inputTags : '',
            data : this.props.user.savePost,
            searchRender : true,
            fadeAnim: new Animated.Value(0),
            deleteMode : false,

            deleteDataSelection : [],

        }
    }

    componentDidMount(){
        console.log(this.props.press)
        this.fadeIn()
    }

    fadeIn = async () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
        }).start();
    };
    fadeOut = async () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    };
    searchRender(){
        return(
            <Animated.View style={[style.shadow,{opacity:this.state.fadeAnim},{backgroundColor : 'white',borderRadius : 10,alignSelf : 'stretch',paddingVertical : 5,paddingHorizontal : 20}]}>
                <TextInput
                    editable={this.state.searchRender}
                    placeholder={'Search Photo by tags ...'}
                    value={this.state.inputTags}
                    onChangeText={(val)=>{
                        console.log('tag : ', val)
                        this.setState({inputTags : val})
                    }}
                />
            </Animated.View>
        )
    }
    imageThumb2(){
        return(
            <View style={{paddingBottom:200,paddingTop : 75,paddingLeft : D.width*0.01}}>
                {
                    (this.state.deleteMode)?
                    <View style={{paddingBottom : 10,paddingRight : D.width*0.01}}>
                        <View style={{flexDirection : 'row'}}>
                            <View style={{flex : 1/2}}>
                                <Text>Selected Photo {this.state.deleteDataSelection.length}</Text>
                            </View>
                            <View style={{flex : 1/2, flexDirection : 'row',alignSelf : 'flex-end'}}>
                                <View style={{flex : 1/2}}>
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            this.deleteSelectionLogic()
                                            this.setState({deleteMode : false})
                                        }}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex : 1/2,alignItems : 'flex-end'}}>
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            this.cancleSelectionLogic()
                                            this.setState({deleteMode : false})
                                        }}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                    :null
                }
                
                <View>
                    <View style={{flexDirection : "row",flexWrap : 'wrap' ,}}>
                        {this.state.data.map((item,index)=>{
                            return(
                                <View>
                                    {this.imageFlatlist(item,index)}
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        )
    }
    imageFlatlist(item,index){
        if(item.tags.includes(this.state.inputTags)){
            return(
                <TouchableOpacity 
                    // disabled={(this.state.deleteMode)? true : false}
                    delayLongPress={200}
                    onLongPress={()=>{
                        if(this.state.deleteMode){
                            this.scrollView.scrollTo({y:0})
                        }else{
                            let dat = this.state.data
                            dat[index].save = false
                            let deldat = this.state.deleteDataSelection
                            deldat.push(item.media.m)
                            this.setState({data:dat,deleteDataSelection : deldat},()=>{
                                this.setState({deleteMode : true})
                            })
                        }
                    }}
                    onPress={()=>{
                        if(this.state.deleteMode){
                            console.log('item selected ',index+1)
                            this.selectionLogic(item,index)
                        }
                    }}
                >
                    <View style={{paddingRight : D.width* 0.01,paddingBottom : D.width*0.01}}>
                        <ImageBackground blurRadius={(this.state.deleteMode && !item.save)? 3 : 0} source={{uri : item.media.m}} style={{width : D.width * 1/ 3.13, height : D.width * 30/100,borderRadius : 2,alignItems : 'center',justifyContent:'center',padding : 5}}>
                            {this.deleteSelectionRender(item,index)}
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            )
        }else if(this.state.tags == ''){
            return(
                <TouchableOpacity 
                    // disabled={(this.state.deleteMode)? true : false}
                    delayLongPress={200}
                    onLongPress={()=>{
                        if(this.state.deleteMode){
                            this.scrollView.scrollTo({y:0})
                        }else{
                            let dat = this.state.data
                            dat[index].save = false
                            let deldat = this.state.deleteDataSelection
                            deldat.push(item.media.m)
                            this.setState({data:dat,deleteDataSelection : deldat},()=>{
                                this.setState({deleteMode : true})
                            })
                        }
                    }}
                    onPress={()=>{
                        if(this.state.deleteMode){
                            console.log('item selected ',index+1)
                            this.selectionLogic(item,index)
                        }
                    }}
                >
                    <View style={{paddingRight : D.width* 0.01,paddingBottom : D.width*0.01}}>
                        <ImageBackground blurRadius={(this.state.deleteMode && !item.save)? 3 : 0} source={{uri : item.media.m}} style={{width : D.width * 1/ 3.13, height : D.width * 30/100,borderRadius : 2,alignItems : 'center',justifyContent:'center',padding : 5}}>
                            {this.deleteSelectionRender(item,index)}
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    deleteSelectionRender(item,index){
        if(this.state.deleteMode){
            return(
                <View>
                    {
                        (item.save)?
                        <View style={{

                        }}>
                            {/* <Text>{item.save.toString()}</Text> */}
                        </View>
                        :
                        <View style={{
                            
                        }}>
                            <Icon name={'check-circle'} size={35} color={colors.redSelect}/>
                        </View>
                    }
                </View>
            )
        }
    }
    selectionLogic = async (item,index) =>{
        let deldat = this.state.deleteDataSelection
        if(item.save){
            deldat.push(item.media.m)
        }else{
            let loop = deldat.indexOf(item.media.m)
            deldat.splice(loop,1)

        }

        let dat = this.state.data
        dat[index].save = !this.state.data[index].save

        this.setState({data : dat, deleteDataSelection : deldat},()=>{
            console.log(this.state.deleteDataSelection)
            if(this.state.deleteDataSelection.length == 0){
                this.setState({deleteMode : false})
            }
        })
    }
    cancleSelectionLogic = async () =>{
        let dat = this.state.data
        dat.map((item,index)=>{
            dat[index].save = true
        })

        this.setState({data : dat, deleteDataSelection : []})
    }
    deleteSelectionLogic = async () =>{
        let datSelection = this.state.deleteDataSelection
        let dataProps =  await this.props.user.savePost
        let savePost = await this.props.user.savePost
        datSelection.map(async(item,index)=>{
            let loop = dataProps.map(function(e) { return e.media.m ; }).indexOf(datSelection[index])
            console.log(loop)
            if(loop >= 0){
                savePost.splice(loop,1)
                this.props.dispatch({type : "REMOVE_SAVEPOST",savePost})
            }
        })
        this.setState({deleteDataSelection : []})
    }

    render() {
        return (
            <View style={{flex : 1,paddingTop : 25,backgroundColor : '#fff'}}>
                <ScrollView showsVerticalScrollIndicator={false} 
                     ref={ref => {this.scrollView = ref}}
                     scrollEventThrottle={async({nativeEvent})=>{}}
                     onScroll={async({nativeEvent})=>{
                        let positionY = nativeEvent.contentOffset.y
                        // console.log(positionY)
                        if(positionY>350){
                            this.setState({searchRender:false})
                            this.fadeOut()
                        }else if(positionY<70){
                            this.setState({searchRender:true})
                            this.fadeIn()
                        }
                     }}
                >
                    <View style={{paddingTop : 20}}>
                        {this.imageThumb2()}
                    </View>
                </ScrollView>
                <View style={{paddingHorizontal : D.width*2/100,paddingTop : 40,position :'absolute',width : '100%'}}>
                    {this.searchRender()}
                </View>
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
