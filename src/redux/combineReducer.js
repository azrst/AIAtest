import {combineReducers} from 'redux';

import userReducer from './reducer/userReducer'
import authReducer from './reducer/authReducer'
const rootReducer = combineReducers({
  user : userReducer,
  auth : authReducer,
});

export default rootReducer;