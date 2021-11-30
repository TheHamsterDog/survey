import React from 'react';
import 'antd/dist/antd.css';
import { AiOutlineClose } from 'react-icons/ai';
import { Menu, Slider } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom'
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

type Props = {
  state: any
}
class App extends React.Component<Props> {
  state = {
    current: '',
    redirect: false,
    path: '',
  };

  handleClick = (e: any) => {
    if (e.target.id === '/logout') {
      localStorage.removeItem('token');
      window.location.reload()
    }
    else {
      window.location.assign(e.target.id);
    }

  };
  constructor(props: any) {
    super(props);
  }

  render() {
    const { current } = this.state;
    let image: any;
    if (this.props.state.isLoaded === true) {
      image = this.props.state.user.user.image[0]
      console.log(image);
    }



    return (
      <div className='nav' >


        <input type='checkbox' className="nav-check" id='nav' />
        <label htmlFor="nav" className='nav-background'>
          {/* &nbsp */}

        </label>
        <label htmlFor="nav" className='nav-button'>Menu</label>
        <div className='nav-bar'>
          <ul className="nav-bar-list">
            <li className="nav-bar-list-item" onClick={this.handleClick} id='/'>Home</li>
            <li className="nav-bar-list-item" onClick={this.handleClick} id='/post'>Create New Form</li>
            <li className="nav-bar-list-item" onClick={this.handleClick} id='/profile'>My Surveys</li>
            <li className="nav-bar-list-item" onClick={this.handleClick} id='/edit-profile'>Edit Profile</li>
            <li className="nav-bar-list-item" onClick={this.handleClick} id='/logout'> Log out</li>

          </ul>
        </div>
        <label htmlFor="nav" className='nav-button'>Menu</label>
        <label htmlFor="nav" className='nav-close'><AiOutlineClose></AiOutlineClose></label>
      </div>
    );
  }
}
export default App;
