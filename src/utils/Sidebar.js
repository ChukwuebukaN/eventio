import React from 'react';
import LogoWhite from '../images/LogoWhite.png'
import SidebarImage from '../images/SidebarImage.png'

const SideBar = () => {
  return (
    <div className='sidebar-wrapper'>
      <img src={LogoWhite} className='logo-desktop' alt="Eventio Logo White" />
      <div className='sidebar-quote-wrapper'>
        <p className='sidebar-quote'>“Great, kid. Don’t</p>
        <p className='sidebar-quote'>get cocky.”</p>
          <h1 className='sidebar-quote-divider'>_</h1>
        <p className='sidebar-quote-author'>Han Solo</p>
      </div>
      <img src={SidebarImage} className='sidebar-background' alt="Eventio Logo White" />

    </div>
  );
};

export default SideBar;