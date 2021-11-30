import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import Navbar from './reusables/Navbar'
import {connect, Provider} from 'react-redux';
import AvatarSelector from './AvatarSelector';
import {register} from '../actions/auth'
import { Helmet } from 'react-helmet';
const mapStateToProps=(state:any)=>{
  return({state:state})
}
const mapDispatchToProps=(dispatch:any)=>{

  return({
    onRegister: (event:any)=>{
      register(dispatch,event);
    }
  })
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = (props:any) => {
  console.log(props.state.user.user.image[0]);
  
  const [state,setState]:any = React.useState({submit:false, edit:true, thumbUrl:props.state.user.user.image[0]})
  const onFinish = (values:any) => {

setState({...values, submit:true});
  
};

  const onFinishFailed = (errorInfo:any) => {

  };

  return ( <div className="auth-form">
   <div className='landing-top'>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Edit Your Profile</title>
          
            </Helmet>
      
      <div className='auth-header'> <h1 className='auth-header-heading'>Edit Your Profile!</h1> </div>
   </div>
   <div className='landing-description'>
      <div className='auth-form-container'>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
>
  <Form.Item label="name" name="name" rules={[{ required: true}]}><Input /></Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, type:'email', message: 'Please type a correct email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="image" name="image"> 
      <AvatarSelector onRegister={props.onRegister} state={state} ></AvatarSelector></Form.Item>

      <Form.Item
        label="Password"
        name="password" 
       
      >
        <Input.Password placeholder="If you leave this field empty, your password will not be changed" />
      </Form.Item>
      
<div className='form-button'>
      <Form.Item  name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
      </div>
    </Form></div></div> </div>
  );
};
export default connect(mapStateToProps,mapDispatchToProps)(Register)