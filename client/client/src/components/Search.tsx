import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { Card } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component';
import F04 from './404';
import {Helmet} from 'react-helmet';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Col, Row } from 'react-grid-system';
const { Meta } = Card;
const { Search } = Input;
const S = (props: any): JSX.Element => {
    let loadingRef: any = React.createRef();
    let { search }: any = useParams();



    // document.body.style.overflowY='scroll'



    const [state, setState]: any = React.useState({ keepLoading: true, posts: [], initialLoad: false, notFound: false });
    const RequestForMore: Function = async (to: number, from: number) => {
        try{
        let posts: any = await axios.get('/api/post/search/' + search+'/'+ to+ '/' +from);
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
    catch (e) {
        setState({...state, notFound: true, initialLoad: true})
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


    // if (state.posts.length === 0 && !state.notFound) {
    //     RequestForMore(8, 0);
    // }
    if (!state.initialLoad) {
        RequestForMore(8, 0);
    }
    let index = 0;
    if (state.initialLoad ) {
        if (state.notFound) {
            return (<div><div style={{backgroundColor:'#B6AE17', paddingTop:'6%', paddingBottom:'6%', textAlign:'center'}}>

            <h2> Search For Posts</h2>
            <Helmet>
                <meta charSet="utf-8" />
        <title>CovidHelp: {search}</title>
               <meta name="description" content={search}></meta>
               <meta name="keywords" content={search}></meta>
            </Helmet>
            <br />
            <Search
            style={{margin:'0% 20%', width:'50%'}}
                  placeholder="input search text"
                  enterButton="Search"
                  size="large"
                  onSearch={(value:any) => window.location.href='/search/'+value}
                />
            </div><F04></F04></div>)
        }
        else {
            return (<div className='app'>
                <div className='landing-top'>
                <div style={{backgroundColor:'#B6AE17', paddingTop:'6%', paddingBottom:'6%', textAlign:'center'}}>
                <h1 style={{textAlign: 'center'}}>Your Search Results</h1>
<br />
<Search
style={{margin:'0% 20%', width:'50%'}}
      placeholder="input search text"
      enterButton="Search"
      size="large"
      onSearch={(value:any) => window.location.href='/search/'+value}
    />
    <br />

</div>
                   

                </div>
                <div className='posts' style={{ textAlign: 'center', marginTop: '5%', marginLeft: '10%', marginRight: '10%' }}>
                <Helmet>
                <meta charSet="utf-8" />
        <title>CovidHelp: {search}</title>
               <meta name="description" content={search}></meta>
               <meta name="keywords" content={search}></meta>
            </Helmet>
            <Row>
                    <InfiniteScroll
                        dataLength={state.posts.length} //This is important field to render the next data
                        next={() => onScroll()}
                        hasMore={state.keepLoading}
                        loader={<div style={{ marginTop: '10%', marginBottom: '10%', marginRight: '40%' }}><CircularProgress /></div>}
                        endMessage={
                            <p style={{ textAlign: 'center', marginRight:'50%' }}>
                            <b>You have seen all of the posts that match your criterion</b>
                        </p>
                        }
                        // below props only if you need pull down functionality
                        refreshFunction={() => { setState({ keepLoading: true, posts: [], initialLoad: false }) }}
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
                            return (<Col key={post._id} sm={1} md={2}  lg={4}>
                            <div key={post._id}><Link to={link} ><div><Card hoverable style={{ width: '100%' }} cover={<img style={{ height: '300px' }} src={post.images[0]}></img>}>
                                <Meta title={post.title} description={post.description} />
                            </Card>
                                <br /></div></Link><br /></div></Col>
                                )
                        })




                        }
                    </InfiniteScroll>   </Row></div>
                {/* {state.keepLoading ? <div ref={paneDidMount} className='end' style={{ margin: '10% 0%' }} onWheel={() => {
                    console.log('hey');
                }
                } onScroll={() => console.log('scrolled')}><CircularProgress /></div> : null} */}
            </div>)

        }
    }
    else {
        return (<div style={{ margin: '20% 0%' }}><CircularProgress /></div>)
    }


}
export default S;
