import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import Navbar from './reusables/Navbar'
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import { login } from '../actions/auth'
import { Link } from 'react-router-dom';
const mapStateToProps = (state: any) => {
  return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

  return ({
    onLogin: (event: any) => {
      login(dispatch, event);
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
    await axios.post('/api/auth/forgotpassword', { email: email })
  }
  const onFinish = (values: any) => {
    props.onLogin(values)
  };

  const onFinishFailed = (errorInfo: any) => {

  };

  return (<div className='auth-form'>
    <div className='lan'>

      <div className='auth-header'> <h1 className='auth-header-heading'>Login!</h1> </div>
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
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input className='auth-form-input' />
          </Form.Item >

          <Form.Item
            label="Password"
            name="password"

            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className='auth-form-input' />
          </Form.Item>
          <div className='form-button'>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
              <Link to='/forgot-password'>ForgotPassword?</Link>
            </Form.Item>
          </div>
        </Form>

      </div></div>  </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)