import React from 'react';
import './style.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/reusables/Navbar'
import { connect, Provider } from 'react-redux';
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import { loadUser } from './actions/auth';
import { setAlert } from './actions/alert';
import Post from './components/Post'
import Redirecter from './components/Redirecter'
import Alert from './components/Alert';
import Profile from './components/profile';
import Posts from './components/Posts';
import F04 from './components/404';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import Subs from './components/submition';
import Search from './components/Search';
import Responses from './components/responses';
import ProfileEdit from './components/profileEdit';
import Profiles from './components/Profiles'
import Reset from './components/Reset';
import { CircularProgress } from '@material-ui/core';
const mapStateToProps = (state: any) => {
  return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

  return ({
    load: (event: any) => {
      loadUser(dispatch, event);
    },
    setAlert: (message: any, alertType: any) => {
      setAlert(message, alertType, dispatch);
    }
  })
}
function App(props: any) {

  if (!props.state.isLoaded) {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      props.load(token)
    }
  }
  if (props.state.isLoaded) {
    return (<div className='App'>
      <Router>
        <NavBar state={props.state}></NavBar>
        {props.state.alerts.length > 0 ? props.state.alerts.map((alert: any) => {
          console.log(alert.msg)
          return (<Alert message={alert.msg} type={alert.alertType} key={alert.id} ></Alert>)
        })

          : null
        }
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/posts'> <Posts></Posts ></Route>
          <Route exact path='/dashboard'><h1>This is the dashboard</h1></Route>
          <Route exact path='/profile'><Profile state={props.state}></Profile></Route>
          <Route exact path='/profile/:id'><Profiles></Profiles></Route>
          <Route exact path='/post'><Post></Post></Route>
          <Route exact path='/register'><Redirect to='/'></Redirect></Route>
          <Route exact path='/login'><Redirect to='/'></Redirect></Route>
          <Route exact path='/posts/:id' ><Subs state={props.state}></Subs></Route>
          <Route exact path='/posts/:id/responses' > <Responses state={props.state}/></Route>
          <Route exact path='/edit-profile' ><ProfileEdit></ProfileEdit></Route>
          <Route exact path='/search/:search' ><Search state={props.state}></Search></Route>
          {/* <Route exact path='/:id'><Redirecter></Redirecter></Route> */}
          <Route><F04></F04></Route>
        </Switch>
        <div className="bottom-container">
          <a className="footer-link" href="https://www.linkedin.com/in/shreshth-verma-17ab39213/">LinkedIn</a>
          <a className="footer-link" href="https://twitter.com/VermaShreshth">Twitter</a>
          <a className="footer-link" href="https://www.shreshthverma.me/">Website</a>
          <p>© 2020 Shreshth Verma.</p>
        </div>
      </Router>
    </div>)
  }
  else if (localStorage.getItem('token')) {
    return (<div style={{ textAlign: 'center' }}><br /> <br /> <br /><div style={{ marginTop: '15%' }} /><CircularProgress ></CircularProgress></div>)
  }
  else {

    return (
      <div className="App">
        {props.state.alerts.length > 0 ? props.state.alerts.map((alert: any) => {
          console.log(alert.msg)
          return (<Alert message={alert.msg} type={alert.alertType} key={alert.id} ></Alert>)
        })

          : null
        }
        <Router>
          {/* <NavBar state={props.state}></NavBar> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login"> <Login setAlert={props.setAlert}></Login></Route>
            <Route exact path="/forgot-password"> <ForgotPassword /></Route>
            <Route exact path="/register" component={Register} />
            <Route exact path='/posts'> <Posts></Posts ></Route>
            <Route exact path='/posts/:id' ><Subs state={props.state}></Subs></Route>
            <Route exact path='/search/:search' ><Search state={props.state}></Search></Route>
            <Route exact path='/profile/:id'><Profiles></Profiles></Route>
            <Route exact path='/profile/'><Redirect to='/login' /></Route>
            <Route exact path='/post'><Redirect to='/login' /></Route>
            <Route exact path='/reset/:id'><Reset /></Route>
            <Route><F04></F04></Route>
          </Switch>
          <div className="bottom-container">
            <a className="footer-link" href="https://www.linkedin.com/">LinkedIn</a>
            <a className="footer-link" href="https://twitter.com/">Twitter</a>
            <a className="footer-link" href="https://www.shreshth.me/">Website</a>
            <p>© 2020 Shreshth Verma.</p>
          </div>
        </Router>
      </div>
    );


  }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);
