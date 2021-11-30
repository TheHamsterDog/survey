import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link, useParams } from 'react-router-dom'
import { Button } from 'antd';
import axios from 'axios'
import { Card } from 'antd';
import F404 from './404';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Helmet} from 'react-helmet';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const { Meta } = Card;

const Profiles =  (props: any) => {
    // console.log(props.state.user.user)

    // console.log(icon);
    const [state, setState]: any = React.useState({ posts:[], user:{}, load:true, error:false});
    let { id }: any = useParams();
    let icon:any;
    const posts = async () => {
        
        try {
          
            const u:any = await axios.get('/api/user/' + id)
            const po: any = await axios.get('/api/post/user/'+id)
            const p = po
            // console.log(p.data)
            const user= u.data.msg;
            console.log(user);
            

           setState({user:user, posts:[...po.data.msg], load:false})
        }
        catch (e) {
            console.log(e.response);
            setState({user:null, error:true, load:false});
            

        }
    }
    // return(<div>Something Big</div>)
    if(state.load){
        posts()
        console.log(state);
        
        return(<div style={{margin:'20% 0'}}><CircularProgress></CircularProgress></div>)
        

    }
    else{

    
    
if(state.user===null){
return(<div style={{margin:'20% 0'}}><F404 /></div>)
}
else{


    return (
        
        <div className='profile' style={{ textAlign: 'center' }}>
        <Helmet>
                <meta charSet="utf-8" />
        <title>CovidHelp: {state.user.userName}</title>
               <meta name="description" content={state.user.userName}></meta>
               <meta name="keywords" content={state.user.userName + ' ' + state.user.name + ' covid help covidhelp account'}></meta>
            </Helmet>
            <div style={{ backgroundColor: '#9CEC88', paddingTop: '3%', paddingBottom: '2%' }}>
                <img src={state.user.image[0]} style={{ borderRadius: '100%', width: '25%', height: '25%', display: 'inline-block', marginBottom: '2%' }} ></img>
                <div className='name' style={{ display: 'block' }}><h1>{state.user.userName}</h1></div>
            </div>
            <div style={{ backgroundColor: '#00B880', paddingTop: '3%', paddingBottom: '3%', textAlign: 'center' }}>
                <h1>
                    {state.user.userName +'\'s '} Posts
</h1>
                <br />
                <br />
                {state.posts.length>0? <div>{state.posts.map((post: any) => {
                    const link = '/posts/'+post._id;
                    return (
                        <div style={{ marginLeft: '37%', marginRight: '10%' }} >
                            <Link to={link}>
                            <Card hoverable cover={<img src={post.images[0]}></img>} style={{width:'50%'}} ><Meta title={post.title} description={post.description}></Meta></Card>
                            </Link>
                            {/* <Carousel width='100%' >
                                {post.images.map((image: any) => {
                                    return (<div style={{ height: '400px' }}>
                                        <img height='100%' width='100%' src={image}></img>
                                        <p className="legend">{post.title}</p>
                                        <br /><br /><br /></div>)
                                })}
                            </Carousel> */}
                            <br></br>
                        </div>
                    )
                })}</div> : <h2 style={{ fontSize: '100%' }}>He haven't made any posts yet</h2>}
            </div>
            <div style={{ backgroundColor: '#B6AE17', paddingTop: '5%', paddingBottom: '5%', textAlign: 'center' }}>
                <Button type="primary" size='large' >
                    <Link to='/post'>Make a New Post</Link>
                </Button>
            </div>
        </div>

    )

}
}
}
export default Profiles