import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	View,
	Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import Home from '../page/home/home'
import Profile from '../page/profle/profile'
import AddFeed from '../page/addFeed/tempAdd'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../variable/color';


const Tab = createBottomTabNavigator();
const screenOp = {
	headerShown:false,
	gestureEnabled: false,
}

const CostomTabBar = ({children,onPress}) => (
    <View style={{
        top : -30,
        justifyContent : 'center',
        alignItems : 'center',
    }}>
        <TouchableWithoutFeedback 
            onPress={onPress}
        >
            <View style={{
                height : 80,
                width : 80,
                borderRadius : 80,
                backgroundColor : colors.blueButton,
                ...style.shadow
            }}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    </View>
    
    
)
function HomeBottom() {
  return (
		<Tab.Navigator screenOptions={screenOp} 
			tabBarOptions={{
				labelStyle:{paddingBottom : 5},
                style:{
                    position : 'absolute',
                    bottom : 20,
                    left  : 20,
                    right : 20,
                    elevation : 0,
                    borderRadius : 10,
                    backgroundColor : '#fff',
                    height : 80,
                    ...style.shadow
                },
                showLabel : false
			}}
		>
			<Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="AddFeed" component={AddFeed} 
                options={{
                    tabBarIcon : ({focused}) =>(
                        <View>
                            <Icon name={'plus'} color={'white'} size={40}/>
                        </View>
                    ),
                    tabBarButton : (props) =>(
                        <CostomTabBar {...props}/>
                    ),
                    tabBarLabel : ''
                }}
            />
            <Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
  );
}

const style = StyleSheet.create({
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})

export default HomeBottom;