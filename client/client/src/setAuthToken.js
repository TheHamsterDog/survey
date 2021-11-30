import axios from 'axios';
export const setAuthToken=token=>{
  console.log('token received');
  if(token){
    axios.defaults.headers.common['x-auth-token']=token
    console.log('token set');
  }
  else{
    delete axios.defaults.headers.common['x-auth-token'];
  }
}
