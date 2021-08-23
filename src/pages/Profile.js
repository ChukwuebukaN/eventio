import React, { Fragment, useState } from 'react';
import LogoBlack from '../images/LogoBlack.png';
import { MdArrowDropDown } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { AuthRoutes } from '../constants';
import DropdownModal from '../components/modals/DropdownModal';

function Profile() {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  /** handles routing to Profile page */
  const handleHomeRoute = () => {
    history.push(AuthRoutes.dashboard)
  };

  const openDropdownModal = () => {
    setModalOpen(true)
  };

  const modalAccountModal = () => {
    if (modalOpen === true) {
      return <DropdownModal />
    }
  };

  return (
    <Fragment>
      <div>
        <img src={LogoBlack} className='logo-dashboard' alt="Eventio Logo Black" onClick={handleHomeRoute}/>
        <div className='dashboard-account-wrapper'>
          <div className='dashboard-account-initials'>TM</div>
          <div className='dashboard-account-name' onClick={openDropdownModal}>Tom Watts</div>
          <MdArrowDropDown className='dashboard-account-dropdown' onClick={openDropdownModal}/>
        </div>
      </div>
      {modalAccountModal()}
    </Fragment>
  )
};

export default Profile;
