import Toast from 'react-native-toast-message'

export const ToastMessage = (type,position,text1,text2) =>{
    const a = Toast.show({
        type: (type==undefined)? 'info' : type,
        position: (position==undefined)? 'top' : position,
        text1: (text1==undefined)? 'text undifined' : text1,
        text2: (text2==undefined)? 'text2 undifined' : text2,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        // onShow: () => {},    
        // onHide: () => {},
        // onPress: () => {}   
    });
    // return console.log('return toast message called : ',text1)
    return a
}

// export default ToastMessage