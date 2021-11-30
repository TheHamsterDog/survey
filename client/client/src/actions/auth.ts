import { LOGIN_SUCCESS } from '../constants';
import { REGISTER_SUCESS } from '../constants';
import { LOADUSER_SUCCESS } from '../constants';
import { LOGIN_FAIL } from '../constants';
import { REGISTER_FAIL } from '../constants';
import { LOADUSER_FAIL } from '../constants';
import axios from 'axios'
import { setAlert } from './alert.js';
import { setAuthToken } from '../setAuthToken';
const login = async (dispatch: any, credentials: { email: string, password: string, remember: boolean }) => {
    try {

        const token = await axios.post('/api/auth', credentials);
        dispatch({ type: LOGIN_SUCCESS, payload: token.data.token })
        setAuthToken(token.data.token)
        setAlert('login success', 'success', dispatch)
        loadUser(dispatch, token.data.token);
        if (credentials.remember) {
            localStorage.setItem('token', token.data.token);
        }
    }
    catch (e) {

        console.log(e.response.data);
        setAlert('Incorrect Credentials', 'error', dispatch)
    }
}
const register = async (dispatch: any, credentials: { email: string, password: string, url: string | null, username: string, remember: boolean }) => {
    try {
        console.log('register attempt');
        
        const token = await axios.post('/api/user', credentials);
        if (credentials.remember) {
            localStorage.setItem('token', token.data.token);
        }
        setAuthToken(token.data.token)
        setAlert('Registered successfully, please verify your account by clicking on the link sent to your registered email account', 'success', dispatch)
        dispatch({ type: REGISTER_SUCESS, payload: token.data.token });
        loadUser(dispatch, token.data.token)






    }
    catch (e) {
        console.log(e.response.data);
        setAlert('User Already Exists', 'error', dispatch)
        //   setAlert(e.response.data.msg,'error',dispatch)  
    }
}
const loadUser = async (dispatch: any, token: string) => {
    try {
        // let config = {
        //     headers: {
        //       'x-auth-token': token,
        //     }
        //   }
        setAuthToken(token);
        const user = await axios.get('/api/auth');
        dispatch({ type: LOADUSER_SUCCESS, payload: user.data });
    }
    catch (e) {
        console.log(e);
        localStorage.removeItem('token');
    }
}
export { login, register, loadUser }