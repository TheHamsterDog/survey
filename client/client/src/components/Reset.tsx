import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import Navbar from './reusables/Navbar'
import { connect, Provider } from 'react-redux';
import AvatarSelector from './AvatarSelector';
import { login, register } from '../actions/auth'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { setAlert } from '../actions/alert';
import F04 from './404';
import {Helmet} from 'react-helmet';
const mapStateToProps = (state: any) => {

    return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

    return ({
        onLogin: (event: any) => {
            login(dispatch, event);
        },
        onAlert: (event: any) => {
            setAlert(event.msg, event.type, dispatch);
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
    const [state, setState] = React.useState({ real: true, initial: false });
    let { id }: any = useParams();
    const check = async () => {

        try {
            await Axios.get(`/api/auth/resetpassword/${id}`);
            setState({ real: true, initial: true });
        }
        catch {
            setState({ real: false, initial: true })
        }
    }
    if (state.initial === false) {
        console.log('Initial Load');

        check();
    }

    const onFinish = async (values: any) => {
        try {
            const reset = await Axios.post(`/api/auth/resetpassword/${id}`, { password: values.password })
            await props.onLogin({ email: reset.data.email, password: values.password, remember: values.remember });
            props.onAlert({ msg: 'Your Password Has Been Reset, and you are now logged in' });
            window.location.href = 'http://localhost:3000';
        }
        catch (e) {
            props.onAlert({ msg: 'Something Went Wrong', type: 'danger' });
        }
    };

    const onFinishFailed = (errorInfo: any) => {

    };
    if (state.real) {
       
        return (<div>
            <div className='landing-top'>
            <Helmet>
                <meta charSet="utf-8" />
        <title>Reset Your Password</title>
             
            </Helmet>
                <div className='login-title'> <h1>Reset your password!</h1> </div>
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
                            label="New Password"
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
                    </Form></div></div> </div>
        );
    }
    else {
        return (<div> <F04></F04></div>)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Register)