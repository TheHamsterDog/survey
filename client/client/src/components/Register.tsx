import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import Navbar from './reusables/Navbar'
import { Helmet } from 'react-helmet';
import { connect, Provider } from 'react-redux';
import AvatarSelector from './AvatarSelector';
import { register } from '../actions/auth'
const mapStateToProps = (state: any) => {
  return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

  return ({
    onRegister: (event: any) => {
      register(dispatch, event);
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

const Register = (props: any) => {
  const [state, setState]: any = React.useState({ submit: false, edit: false })
  const onFinish = (values: any) => {

    setState({ ...values, submit: true , edit: false});

  };

  const onFinishFailed = (errorInfo: any) => {

  };

  return (<div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Make a new account</title>
      <meta name="description" content='Make a new covidHelp account'></meta>
      <meta name="keywords" content="make new covid help covidhelp account"></meta>
    </Helmet>
    <div className='auth-form'>
      <div className='auth-header'> <h1 className='auth-header-heading heading-secondary'> Register!</h1> </div>

      <div className='landing-description'>
        <div className='auth-form-container'>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="name" name="name" rules={[{ required: true, message: 'Please Enter Your Name' }]}><Input /></Form.Item>
            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please type a correct email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="image" name="image">
              <AvatarSelector onRegister={props.onRegister} state={state} ></AvatarSelector></Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <div className='form-button'>
              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" block>
                  Submit
        </Button>
              </Form.Item>
            </div>
          </Form></div></div> </div></div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Register)