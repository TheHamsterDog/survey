import React from 'react';
import axios from 'axios';
import { Modal } from 'antd';

import F04 from './404';
import { Helmet } from "react-helmet";
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

const { confirm } = Modal;
const Posts = (props: any) => {

    let { id }: any = useParams();
    console.log(props);

    const [state, setState]: any = React.useState({ post: {}, loaded: false, error: false, author: {}, delete: false, responses: [], submit: false })
    const onSubmit = async (e: any) => {

        e.preventDefault();
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        try {

            const submit = await axios.post('/api/post/respond/' + id, { responses: state.responses });
            console.log(state.responses);
            setState({ ...state, submit: true });
            console.log(submit.data);
        }
        catch (e) {
            console.log(e.response);

        }


    }
    const onChange = (e: any) => {
        const element = e.target.name;
        const reply = e.target.value;
        console.log(state.responses);
        // state.responses, { question: element, answer: reply }
        if (state.responses.length >= 1) {
            let a:any= [];
            a.push({ question: element, answer: reply });
            state.responses.filter((response: any) => {
                console.log(response.question);
                console.log(element);

                if (response.question !== element) {
                    a.push(response)
                }
            })
            console.log(a);

            setState({
                ...state, responses: [...a]
            });
            console.log('====================================');
            console.log(state.responses );
            console.log('====================================');
        }
        else {
            
            setState({
                ...state, responses: [{ question: element, answer: reply }]
            });
        }


    }
    const getInfo = async (id: string) => {
        try {

            const data = await axios.get('/api/post/' + id);
            console.log(data.data.msg);
            const user = await axios.get('/api/user/' + data.data.msg.user);
            console.log(user.data.msg);
            let Delete = false;
            if (props.state.user.user !== undefined) {
                console.log('something');

                if (user.data.msg._id.toString() === props.state.user.user._id.toString()) {
                    Delete = true;
                }
            }

            // if (user.data.msg._id.toString() === props.state.user.user._id.toString()) {
            //     Delete = true;
            // }

            setState({ post: data.data.msg, loaded: true, error: false, user: user.data.msg, delete: Delete, responses: [] });

        }
        catch (e) {
            console.log(e);

            setState({ post: {}, loaded: true, error: true })
        }
    }
    if (!state.loaded) {
        getInfo(id);
    }

    if (state.loaded) {
        if (state.error) {
            return (<F04></F04>)
        }
        else {
            // let link = state.post.paypal;

            return (<div className="form">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{state.post.title}</title>
                    <meta name="description" content={state.post.description}></meta>
                    <meta name="keywords" content={state.post.description + ' ' + state.post.title + ' ' + state.post.author + ' ' + 'Covid Help CovidHelp'}></meta>
                </Helmet>
                <div className="form-form">
                    <form className="form-form-container" onSubmit={onSubmit}><div className='form-title'>
                        <div className='form-form-title-container'>
                            <h1 className='form-form-title'> {state.post.title}</h1>
                            <h1 className='form-form-description' id='description'>{state.post.description}</h1>
                        </div>
                    </div>
                        {state.submit ? <div className="form-form-question-formation-group" > Your response has been recorded </div> : state.post.questions.map((question: any) => {
                            return (<div className="form-form-question-formation-group">
                                <h1 className='form-form-question-formation-group-input'>
                                    {question.title}
                                </h1>


                                <input type={question.type} name={question.id} onChange={onChange} className={'form-question form-question-group-' + question.type} />
                            </div>)
                        })}
                        <br />



                        <br />
                        <br />
                        <button type='submit' className='button button-orange ' >Submit</button></form>

                    {state.delete ? <div><button type='button' className=' button-delete' onClick={async () => {
                        return (confirm({
                            title: 'Do You Really Want To Delete This Post?', icon: <DeleteForeverSharpIcon />, async onOk() {
                                try { await axios.delete('/api/post/' + state.post._id); window.location.reload() } catch (e) {

                                }

                                console.log('yes')
                            }, onCancel() { console.log('cancelled') }
                        }
                        ));
                    }}><DeleteForeverSharpIcon></DeleteForeverSharpIcon></button>   <a type='submit' href={state.post._id + '/responses'} className='button button-primary margin-top-2' >See All of the responses you've received</a></div> : null}
                    <br /> <br /> <br />
                </div>
            </div>)
        }


    }
    else {
        return (<CircularProgress></CircularProgress>)

    }
}
export default Posts;
