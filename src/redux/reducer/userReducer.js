const initialState = {
    savePost : [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SAVEPOST":
            return {
                ...state,
                savePost : action.savePost
            };
        default:
            return state;
    } 
 }
 
 export default userReducer; 