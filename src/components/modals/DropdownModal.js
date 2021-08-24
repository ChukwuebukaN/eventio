import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthRoutes, NonAuthRoutes } from '../../constants';
import authHandler from '../../authHandler';

const DropdownModal = () => {
  const history = useHistory();
  
  /** handles routing to Profile page */
  const handleProfileRoute = () => {
    history.push(AuthRoutes.profile)
  };

  /** handles Log out */
  const handleLogout = () => {
    //clear token
    authHandler.delete();
    console.log('deleted')
    history.push(NonAuthRoutes.signin);
    console.log('routed')
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
