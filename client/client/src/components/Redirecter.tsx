import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './reusables/Navbar'
const NotFoundPage =()=>{
    let { id }: any = useParams();
    console.log(id);
    if(id!=='posts'&&id!=='/'&&id!=='post' &&id!=='profile'){

        console.log(id);
        
        return(
        <div><div style={{margin:'20% 30%'}}>

    <h1>404 Page Not Found</h1>
            <p style={{textAlign:"center"}}>

              <Link to="/">Go to Home </Link>
            </p>
            </div></div>);
    }
    else{ 
        return(<div></div>)
    }
}
export default NotFoundPage;
