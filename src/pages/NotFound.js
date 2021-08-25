import React from 'react';
import { useHistory } from 'react-router-dom';
import authHandler from '../authHandler';
import LogoBlack from '../images/LogoBlack.png'
import { NonAuthRoutes } from '../constants';

function NotFound() {
  const history = useHistory();
  const screenIsMobile = authHandler.getUserIsMobile('userMobile')
  
  /** handles routing of sign in page to sign up page */
  const handleSignUpRoute = () => {
    history.push(NonAuthRoutes.signup)
  };

  /** handles routing to Home page */
  const handleHomeRoute = () => {
    history.push(NonAuthRoutes.signin)
  };

  return (
    <div className='onboarding'>
      <div className={screenIsMobile === 'true' ? 'onboarding-mobile' : 'onboarding-desktop'}>
      <img src={LogoBlack} onClick={handleHomeRoute} className={screenIsMobile === 'true' ? 'logo-mobile' : 'hidden'} alt="Eventio Logo Black" />
        <div onClick={handleSignUpRoute} className={screenIsMobile === 'true' ? 'not-found-signup-mobile' : 'hidden'}>
          <h5 className='onboarding-signup-text1'>Don’t have account?</h5>
          <h5 className='onboarding-signup-text2' >SIGN UP</h5>
        </div>
        <div className={screenIsMobile ? 'not-found-wrapper-mobile' : ''}>
          <div className={screenIsMobile ? 'not-found-title-mobile' : 'not-found-title'}>
            404 Error - page not found
          </div>
          <div className={screenIsMobile ? 'not-found-text-mobile' : 'not-found-text'}>
            Seems like Darth Vader just hits our website and drops it down. Please press the refresh button and everything should be fine again.  
          </div>
            <button
              type='submit'
              form="signin"
              value="Submit form"
              className={screenIsMobile === 'true' ? 'not-found-button-mobile' : 'not-found-button-deskt'}
              onClick={handleHomeRoute}>
                REFRESH
            </button>
        </div>      
      </div>
        <div onClick={handleSignUpRoute} className={ screenIsMobile === 'true' ? 'hidden' : 'onboarding-signup-text-desktop'}>
          <h5 className='onboarding-signup-text1'>Don’t have account?</h5>
          <h5 className='onboarding-signup-text2' >SIGN UP</h5>
        </div>
    </div>
  )
};

export default NotFound;
