import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import Navbar from './reusables/Navbar'
import { connect, Provider } from 'react-redux';
import { login } from '../actions/auth'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import pictureWall from './pictureWall'
import PicturesWall from './pictureWall';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { log } from 'console';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
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



  const [state, setState]: any = React.useState({
    post: {
      questions: [], title: '', description: '', submit: false, link: ''
    }
  });

  if (props.state.user.user.isVerified) {
    console.log(window.location.hostname);
    const onFinish = async (e: any) => {
      e.preventDefault();
      try {
        const link = await axios.post('/api/post', { title: state.title, description: state.description, questions: state.post.questions });

        console.log(link.data);
        // if(window)
        setState({ ...state, submit: true, link: `http://localhost:3000/posts/${link.data.post._id}` })




        // setState({submit:true, link:link})
        // setState({ post: values, submit: true })
      }
      catch {
        console.log('error');

      }
    }

    const onClick = () => {
      setState({ ...state, post: { ...state.post, questions: [...state.post.questions, { id: state.post.questions.length, title: 'Question\'s title', type: 'text' }] } })

    }
    console.log(state);


    return (<div>
      <div className='create'>

        <div className='create-title'> <h1 className='create-title-heading'>Make a new post</h1> </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Make a new Survey</title>

      </Helmet>
      {state.submit ? <div className="create-submit"> <div className='create-submit-container'><h1 className="heading-secondary">Here's a link to your survey:</h1> <a className='create-link' href={state.link}> {state.link}</a>  </div></div> :
        <form onSubmit={onFinish} className="create-form">
          <div className="create-form-container">
            <input type="text" name='title' className='create-form-title' onChange={(e) => setState({ ...state, title: e.target.value })} id='title' placeholder='title' required /> <label htmlFor="title" className="label"></label>
            <input type="text" name='description' onChange={(e) => setState({ ...state, description: e.target.value })} className='create-form-description' id='description' placeholder='description' required /> <label htmlFor="title" className="label"></label>
            {state.post.questions.map((question: any) => {
              return (<div className="create-form-question-formation-group">
                <input className='create-form-question-formation-group-input' placeholder={question.title} onChange={(e) => {
                  let questions: any = [];

                  state.post.questions.forEach((q: any) => {
                    if (q.id === question.id) {
                      question.title = e.target.value;
                      console.log(e.target.value);
                      questions.push(question)

                    }
                    else {
                      questions.push(q);
                    }
                  })
                  setState({ ...state, post: { ...state.post, questions: questions } })

                }} type='text'></input>
                <select className='create-form-question-formation-group-input-select'
                  onChange={(e) => {
                    let questions: any = [];

                    state.post.questions.forEach((q: any) => {
                      if (q.id === question.id) {
                        question.type = e.target.value;
                        console.log(e.target.value);
                        questions.push(question)

                      }
                      else {
                        questions.push(q);
                      }
                    })
                    setState({ ...state, post: { ...state.post, questions: questions } })

                  }}>
                  <option value="number">Number</option>
                  <option value="text" selected>text</option>
                  <option value="date">date</option>
                  <option value="email">email</option>
                  <option value="url">Url</option>
                  <option value="tel">Phone Number</option>
                  <option value="color">color</option>
                  


                </select>

                {/* <input type={question.type} className={'form-question form-question-group-' + question.type} /> */}
              </div>)
            })}
            <br />
            <a href='#' className='button button-green' onClick={onClick}>
              New Question
        </a>

            <br />
            <br />
            <button type='submit' className='button button-orange ' >Submit</button></div>
      </form>}

    </div>
    )
  }
  else {
    return (
      <div><div style={{ margin: '20% 30%' }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Post a new submission</title>

        </Helmet>
        <h1>Your Account Is Not Verified, please verify your account by going to the link that has been mailed to your email id</h1>
        <p style={{ textAlign: "center" }}>

          <Link to="/">Go to Home </Link> <br />
          <Button type="primary" block onClick={async () => await axios.get('/api/auth/resend/' + props.state.user.user._id)}> Resend Email</Button>
          <br />
          <Link to="/post">Refresh</Link>
        </p>
      </div></div>);
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)