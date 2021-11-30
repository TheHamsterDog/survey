import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

const { Search } = Input;
const Home = (props:any)=>{
    return(<div> <div className='landing-top'>
      
    <div className='landing-title'> <h1>Covid Help!</h1> </div>
    <img className='landing-image' src='/coronavirus.png' />
 </div>
 <div className='landing-description'><h2 >Help people by donating or ask for donations</h2>
        <br/>
        <Button type="primary" style={{width:'20%', marginLeft:'5%'}} >
  <Link to='/login'>  Log in </Link>
    </Button>
    <Button style={{width:'20%', marginLeft:'5%'}} type="dashed">
    <Link to='/register'>   Sign Up </Link>
    </Button>
   </div>  <Helmet>
                <meta charSet="utf-8" />
                <title>CovidHelp</title>
               <meta name="description" content='Covid19 open source Charity'></meta>
               <meta name="keywords" content="covid 19 help people posts covidhelp donation donate charity"></meta>
            </Helmet>
    <div style={{backgroundColor:'#B6AE17', paddingTop:'6%', paddingBottom:'6%', textAlign:'center'}}>

<h2> Search For Posts</h2>
<br />
<Search
style={{margin:'0% 20%', width:'50%'}}
      placeholder="input search text"
      enterButton="Search"
      size="large"
      onSearch={value => window.location.href='/search/'+value}
    />
</div>

 </div>)
}
export default Home
