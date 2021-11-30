import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import Navbar from './reusables/Navbar'
import axios from 'axios';
import {setAlert} from '../actions/alert';
import { connect, Provider } from 'react-redux';
import { login } from '../actions/auth'
import { Helmet } from 'react-helmet';
const mapStateToProps = (state: any) => {
  return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

  return ({
    onLogin: (event: any) => {
      login(dispatch, event);
    },
    onAlert:(msg: any,type:any)=>{
      setAlert(msg,type,dispatch)
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

const Login = (props: any) => {
    const ForgotPassword = async (email: string) => {

  }
  const onFinish = async(values: any) => {
    console.log(values.email);

    await axios.post('/api/auth/forgotpassword', { email: values.email })
    props.onAlert('If an account with that email exists, we will send information on how you can recover your account','warning')
  };

  const onFinishFailed = (errorInfo: any) => {

  };

  return (<div>
     <Helmet>
                <meta charSet="utf-8" />
        <title>Forgot Password</title>
              
            </Helmet>
    <div className='landing-top'>

      <div className='login-title'> <h1>Forgot your password?</h1> </div>
    </div>
    <div className='landing-description'>
      <div className='login-form'>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input />
          </Form.Item>

          <div className='form-button'>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                Submit
        </Button>
            </Form.Item>
          </div>
        </Form>
      </div></div>  </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)