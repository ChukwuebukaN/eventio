import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthRoutes, NonAuthRoutes } from '../../constants';
import authHandler from '../../authHandler';
import { useDispatch } from 'react-redux';
import { signinUser } from '../../redux/auth/authSlice';

const DropdownModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  /** handles routing to Profile page */
  const handleProfileRoute = () => {
    history.push(AuthRoutes.profile)
  };

  /** handles Log out */
  const handleLogout = () => {
    authHandler.delete();
    console.log('👍 Expired TOKEN cleared')
    history.push(NonAuthRoutes.signin);
    console.log('👍 Logged Out Successfully')
  };

  return (
    <div>
      <div>
      <div className='account-dropdown-picker'></div>
      </div>
      <div className='account-dropdown-modal'>
        <p className='dropdown-routes' onClick={handleProfileRoute}>Profile</p>
        <p className='dropdown-routes' onClick={handleLogout}>Log out</p>
      </div>
    </div>
  )
}

export default DropdownModal;
