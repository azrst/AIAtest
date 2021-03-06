import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../page/splash'
import Home from './bottomHome'
import FeedDetail from '../page/feedDetail/feedDetail'

const Stack = createStackNavigator();


function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/> 
                <Stack.Screen name="FeedDetail" component={FeedDetail} options={{headerShown:false}} />                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;