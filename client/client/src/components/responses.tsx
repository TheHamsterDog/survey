import React from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import F04 from './404';
import { Helmet } from "react-helmet";
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link, useParams } from 'react-router-dom';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

const { confirm } = Modal;
const Posts = (props: any) => {

    let { id }: any = useParams();
    console.log(props);

    const [state, setState]: any = React.useState({ post: {}, loaded: false, error: false, author: {}, delete: false, pg: 1, responses: [] })
    const showResponses = (e: any) => {
        console.log(e.target.name);
        console.log('====================================');
        console.log(state.post.responses);
        console.log('====================================');
    }
    const getInfo = async (id: string) => {
        try {

            const data = await axios.get('/api/post/' + id);
            const user = await axios.get('/api/user/' + data.data.msg.user);
            console.log(data.data.msg.responses);

            let Delete = false;
            if (props.state.user !== undefined) {
                console.log('something');

                if (user.data.msg._id.toString() === props.state.user.user._id.toString()) {
                    Delete = true;
                }
            }
            setState({ post: data.data.msg, loaded: true, error: false, user: user.data.msg, delete: Delete, pg: 1 });
        }
        catch (e) {
            console.log(e);

            setState({ post: {}, loaded: true, error: true })
        }
    }
    console.log('====================================');

    console.log('====================================');
    if (!state.loaded) {
        getInfo(id);
    }

    if (state.loaded) {
        console.log(state.post);
        console.log(state.post)
        console.log(state.post.responses[state.pg])
        if (state.error) {

            return (<F04></F04>)
        }
        else {


            return (<div className="form">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{state.post.title}</title>
                    <meta name="description" content={state.post.description}></meta>
                    <meta name="keywords" content={state.post.description + ' ' + state.post.title + ' ' + state.post.author + ' ' + 'Covid Help CovidHelp'}></meta>
                </Helmet>
                <div className="form-form">
                    <div className="form-form-container" ><div className='form-title'>
                        <div className='form-form-title-container'>
                            <h1 className='form-form-title'> {state.post.title}</h1>
                            <h1 className='form-form-description' id='description'>{state.post.description}</h1>
                            <small className='form-form-description-small'> You Received {state.post.responses.length}  {state.post.responses.length === 1 ? 'response' : 'responses'} </small>

                        </div>

                    </div>
                        {/* <div className='form-response'> */}
                        <h2 className='form-form-description-small margin-top-4 margin-bottom-4 margin-left-4'> Response {state.post.responses.length > 0 ? state.pg : 0} of {state.post.responses.length}   </h2>
                        {state.post.responses.length > 0 ?
                            state.post.responses[state.pg - 1].map((response: any) => {
                                return (<div>
                                    <div className="form-form-question-formation-group">
                                        <h1 className='form-form-question-formation-group-input'>
                                            {state.post.questions[response.question].title}
                                        </h1>


                                        <p className={'form-question'}>{response.answer}</p>
                                    </div>
                                </div>)
                            }) : null}
                        {state.pg < state.post.responses.length ? <button className='button button-orange margin-top-6 margin-right-4' onClick={() => setState({ ...state, pg: (state.pg + 1) })}> Check out the next response</button> : null}
                        {state.pg > 1 ? <button className='button button-green margin-top-6' onClick={() => setState({ ...state, pg: (state.pg - 1) })}> Check out the previous response</button> : null}


                    </div>

                    {state.delete ? <button type='button' className=' button-delete' onClick={async () => {
                        return (confirm({
                            title: 'Do You Really Want To Delete This Post?', icon: <DeleteForeverSharpIcon />, async onOk() {
                                try { await axios.delete('/api/post/' + state.post._id); window.location.reload() } catch (e) {

                                }

                                console.log('yes')
                            }, onCancel() { console.log('cancelled') }
                        }
                        ));
                    }}><DeleteForeverSharpIcon></DeleteForeverSharpIcon></button> : null}
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
