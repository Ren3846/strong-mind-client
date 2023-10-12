import React from 'react';
import { Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuDropDown from './MenuDropDown';
import Logo from '../common/Logo';


function Navbar() {
  const { pathname } = useLocation();
  const user = useSelector((state : any) => state.user);

  return (
    <Menu mode="horizontal" style={{ backgroundColor: 'rgb(243 244 246)', marginTop: '10px' }}>
      <Menu.Item>
           <Logo to={'/'} size={1.3} />
      </Menu.Item>
      
     

        <Menu.Item>
          <Button>
            <Link to={`/user`}>Home</Link>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button>
            <Link to={`/explore`}>Explore</Link>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button>
            <Link to={`/courses/enrolled`}>Enrolled</Link>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button>
            <Link to={`/user/profile`}>Profile</Link>
          </Button>
        </Menu.Item>

      <div className=''>
        {user?.loggedIn ? (
          <div className='w-3'>
          <MenuDropDown  user={user} />
          </div>
        ) : (
          pathname !== '/signin' && (
            <Button>
              <Link to={`signin?from=${pathname}`}>Sign In</Link>
            </Button>
          )
        )}
      </div>
    </Menu>
  );
}

export default React.memo(Navbar);
