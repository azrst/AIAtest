import axios from 'axios'
import React, { Component } from 'react'
import { 
    View,
    Text,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import { D } from '../../variable/dimension'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../variable/color';

export class home extends Component {
    constructor(props){
        super(props)
        this.state={
            feedData : null,

        }
    }

    componentDidMount(){
        this.serviceGetFeed()
    }

    serviceGetFeed = async () =>{
        try{
            const res = await axios.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1',{

            })
            if(res.status == 200){
                console.log('status : ',res.status)
                console.log('data : ',res.data.items.length)
                this.setState({feedData : res.data.items})

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
                        <View style={{paddingBottom : 35}}>
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

    feedRender(){
        return(
            <View>
                <FlatList
                    data={this.state.feedData}
                    renderItem={({item})=>(
                        <View style={{paddingBottom : 20}}>
                            <View style={{flexDirection : 'row',alignItems : 'center'}}>
                                <View style={{width : D.width * 15/100, height : D.width * 15/100, borderRadius : 50, justifyContent :'center', alignItems : 'center',backgroundColor : colors.greyBorder}}>
                                    {/* <Image style={{width : 20,height : 20,resizeMode='contain'}} source={{uri : item.}}/> */}
                                    <Icon name={'face-profile'} size={55} color={'grey'}/>
                                </View>
                                <View style={{paddingLeft : 10}}>
                                    {/* <Text>{item.author}</Text> */}
                                    <Text>{item.author.slice(item.author.search('"')+1,item.author.length-2)}</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{width : D.width * 90/100, height : D.height * 25/100, borderRadius : 10,marginTop : 10,backgroundColor : colors.greyBorder}}>
                                    <Image source={{uri : item.media.m}} style={{width : 100}}/>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    )}
                    keyExtractor={item => item.link}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{flex : 1, backgroundColor : '#fff', paddingHorizontal : D.width * 5/100,}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingTop : 30, paddingBottom : 120}}>
                        {this.state.feedData==null? this.feedLoad() : this.feedRender()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default home
