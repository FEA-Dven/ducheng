import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {combineReducers} from 'redux';
import { countReducer } from './reducer/count';
import { userReducer } from './reducer/user';
import { tabbarReducer } from './reducer/tabbar';

const appReducers = combineReducers({
  countReducer,
  userReducer,
  tabbarReducer
})

let store = createStore(
    appReducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;