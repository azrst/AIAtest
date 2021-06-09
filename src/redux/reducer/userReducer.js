const initialState = {
    savePost : null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CONTACT":
            return {
                ...state,
                savePost : action.contactData
            };
        default:
            return state;
    } 
 }
 
 export default userReducer; 