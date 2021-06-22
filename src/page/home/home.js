import axios from 'axios'
import React, { Component } from 'react'
import { 
    View,
    Text,
    ScrollView,
    RefreshControl,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    StatusBar,
    Animated,
    TouchableWithoutFeedback
} from 'react-native'
import { D } from '../../variable/dimension'
import {connect} from 'react-redux'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../variable/color';
import {ToastMessage} from '../../component/toast' 
import Toast from 'react-native-toast-message';



export class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            feedData : null,
            refreshing : false,
            scrollBool : true,
            headerRender : true,
            fadeAnim: new Animated.Value(0)
        }
    }

    componentDidMount(){
        // console.log('user : ',this.props.user)
        this.fadeIn()
        this.serviceGetFeed()
    }

    fadeIn = async () => {
        // Will change fadeAnim value to 1 in 5 seconds
        this.setState({headerRender : true})
        Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
        }).start();
    };
    fadeOut = async () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()
    };
    
    toastCall = (type,text) =>{
        Toast.show({
            type: (!type)?'info':type,
            position: 'top',
            text1: (!text)? 'undefined' : text,
            // text2: 'text2 undifined',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 70,
            bottomOffset: 40,
            // onShow: () => {},    
            // onHide: () => {},
            // onPress: () => {}   
        });
    }

    serviceGetFeed = async () =>{
        try{
            const res = await axios.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1',{

            })
            if(res.status == 200){
                console.log('status : ',res.status)
                console.log('data : ',res.data.items.length)
                let rest = await res.data.items
                let dat = []
                res.data.items.map((item,index)=>{
                    let obj = {save:false,love:false}
                    let final = {...rest[index],...obj}
                    dat.push(final)
                    // console.log('final : ', final)
                })
                this.setState({feedData : dat})

            }else{
                console.log('status : ',res.status)
                console.log('data : ',res.data)

            }
        }catch(err){
            console.log('err service feed : ',err)
        }   
    }
    servicePushFeed = async () =>{
        try{
            const res = await axios.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1',{})
            if(res.status == 200){
                console.log('status : ',res.status)
                console.log('data : ',res.data.items.length)
                let rest = await res.data.items
                let dat = await this.state.feedData
                res.data.items.map((item,index)=>{
                    let obj = {save:false,love:false}
                    let final = {...rest[index],...obj}
                    dat.push(final)
                    // console.log('final : ', final)
                })
                this.setState({feedData : dat,scrollBool : true})

            }else{
                console.log('status : ',res.status)
                console.log('data : ',res.data)

            }
        }catch(err){
            console.log('err service feed : ',err)
        }   
    }

    feedLoad(){
        let temp = ['','']
        return(
            <View>
                {temp.map((item,index)=>{
                    return(
                        <View style={{paddingBottom : 35,paddingHorizontal : D.width*5/100}}>
                            <SkeletonPlaceholder>
                                <View style={{flexDirection : 'row'}}>
                                <View style={{width : D.width * 15/100, height : D.width * 15/100, borderRadius : 50}}></View>
                                <View>
                                    <View style={{width : D.width * 40/100, height : D.width * 5/100, borderRadius : 10,marginLeft : 10,marginTop : 3}}></View>
                                    <View style={{width : D.width * 25/100, height : D.width * 3/100, borderRadius : 10,marginLeft : 12, marginTop : 5}}></View>
                                </View>
                                </View>
                            </SkeletonPlaceholder>
                            <SkeletonPlaceholder>
                                <View style={{width : D.width * 90/100, height : D.height * 25/100, borderRadius : 10,marginTop : 10}}></View>
                            </SkeletonPlaceholder>
                        </View>
                    )
                })} 
            </View>
        )
    }

    header(){
        return(
            <Animated.View style={{opacity : this.state.fadeAnim}}>
                <View style={[style.shadow,{width : D.width*1,backgroundColor : 'rgba(255,255,255,0.95)'}]}>
                    <Image style={{width : D.width * 30/100, height : D.height*8/100, resizeMode:'contain',paddingLeft : 20,alignSelf : 'stretch'}} source={require('../../asset/Flickr.png')}/>
                </View>
            </Animated.View>   
        )
    }

    savePostLogic = async (index) =>{
        let savePost = await this.props.user.savePost
        var loop = savePost.map(function(e) { return e.media.m ; }).indexOf(this.state.feedData[index].media.m)
        console.log(loop)

        if(loop<0){
            savePost.unshift(this.state.feedData[index])
            this.props.dispatch({type : "SET_SAVEPOST",savePost})
            let temp = this.state.feedData
            temp[index].save = !this.state.feedData[index].save
            this.setState({feedData : temp})
            this.toastCall('success',`Success save photo from ${this.state.feedData[index].author.slice(this.state.feedData[index].author.search('"')+1,this.state.feedData[index].author.length-2)}`)
        }else{
            savePost.splice(loop,1)
            this.props.dispatch({type : "REMOVE_SAVEPOST",savePost})

            let temp = this.state.feedData
            temp[index].save = !this.state.feedData[index].save
            this.setState({feedData : temp})
            this.toastCall('error','Photo removed')
        }
    }

    loveLogic= async (index)=>{
        let dat = await this.state.feedData
        dat[index].love = !dat[index].love
        console.log(dat[index].love)

        // this.setState({feedData : dat})

        // dat[index].love =  !this.state.feedData[index].love
        this.setState({feedData : dat},()=>{
            if(this.state.feedData[index].love){
                this.toastCall('success',`You like photo from ${this.state.feedData[index].author.slice(this.state.feedData[index].author.search('"')+1,this.state.feedData[index].author.length-2)}`)
            }else{
                this.toastCall('error',`unlike photo success`)
            }
        })

    }

    feedRender(){
        return(
            <View>
                <FlatList
                    // numColumns={5}
                    nestedScrollEnabled={true}
                    scrollEnabled = {false}
                    data={this.state.feedData}
                    keyExtractor={(item,index) => index}
                    renderItem={({item,index})=>{
                        return(
                            <View>
                                {this.feedDataRender(item,index)}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
    feedRender2(){
        return(
            <View>
                {this.state.feedData.map((item,index)=>{
                    return(
                        <View>
                            {this.feedDataRender(item,index)}
                        </View>
                    )
                })}
            </View>
        )
    }
    feedDataRender(item,index){
        return(
            <View style={{borderBottomWidth:(index == this.state.feedData.length-1)?0 : 1,borderColor : colors.greyBorder, marginBottom : 20,paddingBottom : 15}}>
                <View style={{paddingHorizontal : D.width*5/100}}>
                    <View style={{flexDirection : 'row',alignItems : 'center'}}>
                        <View style={{flex : 8/10,flexDirection : 'row',alignItems : 'center'}}>
                            <View style={{width : D.width * 15/100, height : D.width * 15/100, borderRadius : 50, justifyContent :'center', alignItems : 'center',backgroundColor : colors.greyBorder}}>
                                {/* <Image style={{width : 20,height : 20,resizeMode='contain'}} source={{uri : item.}}/> */}
                                <Icon name={'face-profile'} size={55} color={'grey'}/>
                            </View>
                            <View style={{paddingLeft : 10}}>
                                {/* <Text>{item.author}</Text> */}
                                <Text>{item.author.slice(item.author.search('"')+1,item.author.length-2)}</Text>
                            </View>
                        </View>
                        <View style={{flex : 2/10,alignItems : 'flex-end',justifyContent : 'center'}}>
                            <TouchableOpacity>
                                <Icon name={'dots-horizontal'} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback 
                        onPress={()=>{
                            this.props.navigation.navigate('FeedDetail',{data : this.state.feedData[index]})
                        }}
                        onPressOut={()=>{
                            console.log('pressed out')
                        }}
                        onLongPress={()=>{
                            console.log('pressed long')
                        }}
                    >
                        <View style={[style.shadow,{width : D.width * 90/100, height : D.height * 25/100, borderRadius : 10,marginTop : 15,backgroundColor : '#fff'}]}>
                            <Image source={{uri : item.media.m}} style={{width : D.width * 90/100, height : D.height * 25/100, resizeMode : 'cover',borderRadius : 10}}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{paddingTop : 10,paddingLeft : 5}}>
                        <Text style={{color : colors.greyBold}}>{item.date_taken}</Text>
                    </View>
                    <View style={{flexDirection : 'row',alignItems : 'center',paddingTop : 10,paddingLeft : 0}}>
                        <View style={{flex : 8/10,flexDirection : 'row',alignItems : 'flex-start'}}>
                            <TouchableOpacity style={{paddingRight : 15}} onPress={ async ()=>{
                                this.loveLogic(index)
                            }}>
                                <Icon name={(item.love? 'heart' : 'heart-outline')} size={23} color={(item.love)? 'red' : colors.black}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingRight : 15}} onPress={ async ()=>{
                                this.props.navigation.navigate('FeedDetail',{data : this.state.feedData[index]})
                            }}>
                                <Icon name={'comment-outline'} size={23} color={colors.black}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingRight : 15}} onPress={ async ()=>{
                                this.toastCall()
                            }}>
                                <Icon name={'share-variant'} size={23} color={colors.black}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex : 2/10,justifyContent : 'center',alignItems : 'flex-end'}}>
                            <TouchableOpacity onPress={ async ()=>{
                                this.savePostLogic(index) 
                            }}>
                                <Icon name={(item.save? 'bookmark' : 'bookmark-outline')} size={30} color={(item.save)? colors.greyBold : colors.greyBold}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        (item.title != '')?
                            <View style={{paddingTop : 20,paddingLeft : 5}}>
                                <Text style={{color:colors.black}}>{item.title}</Text>
                            </View>
                        :null
                    }
                    {
                        (item.tags != '')?
                        <View style={{paddingTop : 20,paddingLeft : 5}}>
                            <Text style={{color:colors.blueButton}}>{item.tags}</Text>
                        </View> 
                        :null
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex : 1, backgroundColor : '#fff',}}>
                <StatusBar translucent backgroundColor="rgba(255,255,255,0.8)" />
                <View style={{paddingTop : 20}}>
                </View>
                <ScrollView 
                    // scrollEnabled={this.state.scrollBool}
                    showsVerticalScrollIndicator={false} 
                    ref={ref => {this.scrollView = ref}}
                    scrollEventThrottle={async({nativeEvent})=>{

                    }}
                    onScroll={async({nativeEvent})=>{
                        let positionY = nativeEvent.contentOffset.y
                        // console.log('positionY : ',positionY);
                        if(positionY > 300){
                            // await this.fadeOut()
                            // this.setState({headerRender : false})
                        }else if(positionY < 10){
                            // this.setState({headerRender : true},()=>{
                            //     this.fadeIn()
                            // })
                        }
                        if(isCloseToBottom(nativeEvent) && this.state.scrollBool == true){
                            console.log('bottom reached')
                            this.setState({scrollBool : false})
                            await this.servicePushFeed()
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={async()=>{
                              this.setState({feedData : null})
                              this.serviceGetFeed()
                          }}
                        />
                    }
                >
                    <View style={{paddingBottom : 120}}>
                        <View style={{paddingTop : 30}}>
                            {this.state.feedData==null? this.feedLoad() : this.feedRender2()}
                        </View>
                        <View>
                            {(this.state.scrollBool==false)? 
                                <View style={{alignSelf : 'center',paddingBottom : 60}}>
                                    <ActivityIndicator color={colors.blueButton}/>
                                </View>
                                : 
                                null
                            }
                        </View>
                    </View>
                </ScrollView>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
        )
    }
}


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

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

const mapStateToProps = ({user}) => ({
    user: user,
});

export default connect(mapStateToProps)(Home);


