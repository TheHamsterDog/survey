// import { Button } from 'antd';
import React from 'react';
// import { Link } from 'react-router-dom';
// import { Input } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { connect, Provider } from 'react-redux';
// const { Search } = Input;
const Home = (props: any) => {
  console.log(props.state);
  
  return (<div className='landing'>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Surveys!</title>
      <meta name="description" content='Make free surveys!'></meta>
      <meta name="keywords" content="Surveys free"></meta>
    </Helmet>
    <header>
      <div className='landing-header'>
        <div className='landing-header-title'>
          <h1 className='landing-header-title-heading'>Make Surveys for Free!</h1>
          <h3 className='landing-header-title-sub'>Faster than the wind</h3>
        </div>
        <div className='landing-header-video'>
          <video loop muted autoPlay src="https://raw.githubusercontent.com/TheHamsterDog/survey/main/build/landing-header-video.mp4" className="landing-header-video-content">
            {/* <source src='/landing-header-video.mp4' type='video/mp4' /> */}

          </video>
        </div>
      </div>
    </header>
    <main>
  
      <section className="landing-section-auth ">
        {props.state.user.user?<div className="landing-auth-post"><a href="/post" className="button button-green"> Make a form!</a></div>:
         <div className='landing-auth row'>
         <div className="landing-auth-login">
           <a href="/login" className="button button-orange">
             Login
               </a>
         </div>
         <p className="landing-auth-or">
            
            OR
             
             
         </p>
         <div className='landing-auth-register'>
           <a href="/register" className="button button-green">
             Register
             </a>
         </div>
       </div>
        }
       
      </section>
    </main>
  </div>
  )
}
const mapStateToProps = (state: any) => {
  return ({ state: state })
}
export default connect(mapStateToProps)(Home);