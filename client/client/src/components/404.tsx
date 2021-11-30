import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from './reusables/Navbar'
class NotFoundPage extends React.Component{
    render(){
        return(
          
        <div>
          <Helmet>
                <meta charSet="utf-8" />
        <title>404! Page not found</title>
              
            </Helmet><div style={{margin:'20% 30%'}}>
            <br></br>
    <h1>404 Page Not Found</h1>
            <p style={{textAlign:"center"}}>
            <br></br>
              <Link to="/">Go to Home </Link>
            </p>
            </div></div>);
    }
}
export default NotFoundPage;
