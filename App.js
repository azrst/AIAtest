import React, { useEffect } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Platform
} from 'react-native'
import Routes from './src/navigation/routes'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import {store,persistor} from './src/redux/store'


const App = () =>{
    return(
        <View style={{flex : 1}}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Routes/>
                </PersistGate>
            </Provider>
        </View>
    )
}
export default App;
