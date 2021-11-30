import Alerts from './components/Alert';
import {LOGIN_SUCCESS} from './constants';
import {REGISTER_SUCESS} from './constants';
import {LOADUSER_SUCCESS} from './constants';
import {LOGIN_FAIL} from './constants';
import {SET_ALERT,REMOVE_ALERT} from './constants';
import {REGISTER_FAIL} from './constants';
import {POST_LOADED} from './constants'
import {LOADUSER_FAIL} from './constants';
const initialState={user:{}, posts:[], search:[], searchResult:[], token:'', alerts:[],isLoaded:false}
export const auth=(state=initialState, action:any={})=>{
    switch(action.type){
        case LOGIN_SUCCESS : return Object.assign({}, state,{token:action.payload})
        case REGISTER_SUCESS : return Object.assign({}, state, {token:action.payload})
        case LOADUSER_SUCCESS : return Object.assign({}, state, {user:action.payload, isLoaded:true}) 
        case SET_ALERT: return Object.assign({},state,{alerts:[...state.alerts,action.payload]})
        case REMOVE_ALERT
            :return Object.assign({},state,{alerts:[state.alerts.filter((alert:any)=>alert.id!==action.payload)]})
        case POST_LOADED : return Object.assign({}, state, {posts:[...state.posts, action.payload]})
        default: return state
    }
}