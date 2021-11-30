import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import axios from 'axios'
import { Card } from 'antd';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Helmet } from 'react-helmet';
const { Meta } = Card;
export default (props: any) => {
    // console.log(props.state.user.user)
    const icon = props.state.user.user.image[0];
    // console.log(icon);
    const [Posts, setPosts]: any = React.useState([]);
    const posts = async () => {
        try {
            const po: any = await axios.get('/api/post')
            const p = po
            console.log(p.data)
            setPosts(p.data.msg);
            return (p.data.msg);
        }
        catch (e) {
            console.log(e.response);
            setPosts(null);


        }
    }
    if (Posts !== null) {
        if (Posts.length < 1) {
            posts();

        }


    }


    console.log(Posts);
    return (
        <div className='profile' style={{ textAlign: 'center' }}>
            <div style={{ backgroundColor: '#9CEC88', paddingTop: '3%', paddingBottom: '2%' }}>
                <img src={icon} style={{ width: '20%', height: '20%', display: 'inline-block', marginBottom: '2%' }} ></img>
                <div className='name' style={{ display: 'block' }}><h1>{props.state.user.user.userName}</h1></div>
            </div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Profile</title>
            </Helmet>
            <div style={{ backgroundColor: '#00B880', paddingTop: '3%', paddingBottom: '3%', textAlign: 'center' }}>
                <h1>
                    My Posts
                </h1>
                <br />
                <br />
                {Posts ? <div>{Posts.map((post: any) => {
                    const link = 'posts/' + post._id;
                    return (
                        <div style={{ marginLeft: '22%' }}>
                            <Link to={link}>
                                <Card hoverable cover={<img src={post.images[0]}></img>} style={{ width: '70%' }} ><Meta title={post.title} description={post.description}></Meta></Card>
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
                })}</div> : <h2 style={{ fontSize: '100%' }}>You haven't made any posts yet</h2>}
            </div>
            <div style={{ backgroundColor: '#B6AE17', paddingTop: '5%', paddingBottom: '5%', textAlign: 'center' }}>
                <Button type="primary" size='large' >
                    <Link to='/post'>Make a New Post</Link>
                </Button>
            </div>
        </div>

    )

}