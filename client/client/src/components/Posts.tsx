import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Card } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component';
import {Helmet} from "react-helmet";
import { Input } from 'antd';
import { Col, Row } from 'react-grid-system';
const { Search } = Input;
const { Meta } = Card;

const Posts = (props: any): JSX.Element => {
    let loadingRef: any = React.createRef();




    // document.body.style.overflowY='scroll'



    const [state, setState]: any = React.useState({ keepLoading: true, posts: [], initialLoad: false });
    const RequestForMore: Function = async (to: number, from: number) => {
        let posts: any = await axios.post('/api/post/infinite', { from: from, to: to });
        if (posts.data.msg.length === 0) {

        }
        else {

            if (posts.data.msg.length === 8) {
                keepLoading = true;
                setState({ ...state, posts: [...state.posts, ...posts.data.msg], initialLoad: true })
            }
            else {
                setState({ ...state, posts: [...state.posts, ...posts.data.msg], initialLoad: true, keepLoading: false })
            }

        }

    }

    let keepLoading = true;
    if (state.keepLoading === false) {
        keepLoading = false;
    }
    const onScroll = () => {
        if (state.keepLoading) {
            if (keepLoading) {

                console.log('actually loading');

                keepLoading = false;
                RequestForMore(state.posts.length + 8, state.posts.length)

            }
        };
    }
    const paneDidMount = (node: any) => {
        if (node) {
            console.log('hey there');
            console.log(node);

            node.addEventListener("scroll", onScroll, true);

        }
    }


    if (state.posts.length === 0) {
        RequestForMore(8, 0);
    }

    let index = 0;
    if (state.initialLoad) {
        return (<div className='app'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>CovidHelp: Posts</title>
               <meta name="description" content='Latest CovidHelp Posts'></meta>
               <meta name="keywords" content="covid 19 help people posts covidhelp donation donate charity"></meta>
            </Helmet>
            <div className='landing-top'>
            

                <div className='login-title'> <h1>Latest Posts</h1>
                <Search
style={{margin:'0% 20%', width:'50%'}}
      placeholder="Search for a specific Post"
      enterButton="Search"
      size="large"
      
      onSearch={(value:any) => window.location.href='/search/'+value}
    />
    </div>
            </div>
            


    

            <div className='posts' style={{ textAlign: 'center', marginTop: '5%', marginLeft: '10%', marginRight: '10%'}}>
            <Row>

                <InfiniteScroll
                    dataLength={state.posts.length} 
                    next={()=>onScroll()}
                    hasMore={state.keepLoading}
                    loader={<div style={{ marginTop:'10%', marginBottom:'10%', marginRight:'40%'}}><CircularProgress /></div>}
                    endMessage={
                        <p style={{ textAlign: 'center', marginRight:'' }}>
                            <b>You have seen all the posts on this site!</b>
                        </p>
                    }
                 
                    refreshFunction={() => { setState({ keepLoading: true, posts: [], initialLoad:false }) }}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                >
                    {state.posts.map((post: any) => {

                        const link = '/posts/' + post._id;
                        return (<Col key={post._id} sm={1} md={2} lg={4}><div key={post._id}><Link to={link} ><div><Card hoverable style={{ width: '100%' }} cover={<img style={{height:'300px'}}src={post.images[0]}></img>}>
                            <Meta title={post.title} description={post.description} />
                        </Card>
                            <br /></div></Link><br /></div> </Col>)
                    })




                    }
                </InfiniteScroll>
                </Row></div>
                 {/* {state.keepLoading ? <div ref={paneDidMount} className='end' style={{ margin: '10% 0%' }} onWheel={() => {
                    console.log('hey');
                }
                } onScroll={() => console.log('scrolled')}><CircularProgress /></div> : null} */}
                </div>)

    }
    else {
        return (<div style={{ margin: '20% 0%' }}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>CovidHelp: Posts</title>
               <meta name="description" content='Latest CovidHelp Posts'></meta>
               <meta name="keywords" content="covid 19 help people posts covidhelp donation donate charity"></meta>
            </Helmet>
            <CircularProgress /></div>)
    }

}
export default Posts;
