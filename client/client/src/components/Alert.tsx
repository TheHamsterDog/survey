import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { Alert } from "antd";
const Alerts=(props:any)=>{
  
return( <div>{!props.message?null:<Alert message={props.message} type={props.type} closable  />}</div>)

}
export default Alerts;