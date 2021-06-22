const initialState = {
    isLogin : false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ISLOGIN":
            return {
                ...state,
                savePost : action.isLogin
            };
        default:
            return state;
    } 
 }
 
 export default userReducer; 