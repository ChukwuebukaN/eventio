import React, { useState } from 'react';
// import { MdRemoveRedEye } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import authHandler from '../authHandler';
import LogoBlack from '../images/LogoBlack.png'
import { NonAuthRoutes } from '../constants';
import dashboard from '../api/dashboard';

function CreateEvent() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [inputFirstnameActive, setInputFirstnameActive] = useState(false);
  const [inputLastnameActive, setInputLastnameActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  // const [inputPasswordActive, setInputPasswordActive] = useState(false);
  // const [inputPasswordValActive, setInputPasswordValActive] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateOfEvent, setDateOfEvent] = useState('');
  const [timeOfEvent, setTimeOfEvent] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [capacity, setCapacity] = useState(null);
  // const [password, setPassword] = useState('');
  // const [passwordValidate, setPasswordValidate] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState(false);
  const screenIsMobile = authHandler.getUserIsMobile('userMobile')
  const [signInErrMsg, setSignInErrMsg] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  
  /** handles routing of sign in page to sign up page */
  // const handleSignInRoute = () => {
  //   history.push(NonAuthRoutes.signin)
  // };

  /** handles FirstName form input transition */
  const handleFirstnameTransition = (text) => {
    setTitle(text);
    if (text !== '') {
      setInputFirstnameActive(true);
    } else {
      setInputFirstnameActive(false);
    }
  };
  
  /** handles LastName form input transition */
  const handleLastnameTransition = (text) => {
    setDescription(text);
    if (text !== '') {
      setInputLastnameActive(true);
    } else {
      setInputLastnameActive(false);
    }
  };

  /** handles Email form input transition */
  const handleEmailTransition = (text) => {
    setStartsAt(text);
    if (text !== '') {
      setInputEmailActive(true);
    } else {
      setInputEmailActive(false);
    }
  };

  /** handles Password form input transition */
  const handlePasswordTransition = (text) => {
    setCapacity(text);
    if (text !== '') {
      // setInputPasswordActive(true);
    } else {
      // setInputPasswordActive(false);
    }
  };

    /** handles Password visibility */
  const handleShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  /** handles Password Validation form input transition */
  const handlePasswordValidateTransition = (text) => {
    // setPasswordValidate(text);
    if (text !== '') {
      // setInputPasswordValActive(true);
    } else {
      // setInputPasswordValActive(false);
    }
  };


  const convertDateTime = () => {

    // DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
  }

  /** handles Password Validation, User Sign Up and then routes User to Sign In page */
  const handleCreateNewEvent = (e) => {
    setBtnIsLoading(true)
    e.preventDefault();

    // make Create User API call
    dashboard
    .CreateEvent(title, description, startsAt, capacity)
    .then((response) => {
      if (response.status === 201) {
        console.log('👍 Event was created successfully', response)
      }
    })
    .catch(error => console.log(error))
    setSignInErrMsg(true);
    setTimeout(() => {
      setBtnIsLoading(false)
    }, 1000);
  };

  return (
    <div className='onboarding'>
      <div className={ screenIsMobile === 'true' ? 'createEvent-wrapper' : 'onboarding-desktop'}>
      {/* <img src={LogoBlack} className={screenIsMobile === 'true' ? 'logo-mobile' : 'hidden'} alt="Eventio Logo Black" /> */}
        <header className={ screenIsMobile === 'true' ? 'createEvent-Title' : 'header-text-desktop'}>
          <h2>Create new event.</h2>
          { signInErrMsg || passwordErrMsg ? <h5 style={{color: 'red'}}>Oops! Your Details or Password combination is not valid.</h5> : <h5>Enter details below.</h5> }
        </header>
        <form id='createevent' onSubmit={handleCreateNewEvent} >
          <div className='onboarding-form'>
            <input required type='text' className='onboarding-input' value={title} onChange={(e) => handleFirstnameTransition(e.target.value)}/>
            <label htmlFor='title' className={ inputFirstnameActive ? 'Active' : '' }>
              Title
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required type='text' className='onboarding-input' value={description} onChange={(e) => handleLastnameTransition(e.target.value)}/>
            <label htmlFor='description' className={ inputLastnameActive ? 'Active' : '' }>
              Description
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required placeholder=" " type="date" name="begin" min="2020-01-01" max="2040-12-31"
              className='onboarding-input'
              value={dateOfEvent}
              onfocus="(this.type='date')"
              onblur="(this.type='text')"
              onChange={(e) => handleEmailTransition(e.target.value)} />
            <label htmlFor='date' className={ inputEmailActive ? 'Active' : '' }>
              
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required placeholder=" " type='time' className='onboarding-input' value={timeOfEvent} onChange={(e) => handleEmailTransition(e.target.value)}/>
            <label htmlFor='time' className={ inputEmailActive ? 'Active' : '' }>
              
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required type='text' className='onboarding-input' value={capacity} onChange={(e) => handleEmailTransition(e.target.value)}/>
            <label htmlFor='capacity' className={ inputEmailActive ? 'Active' : '' }>
              Capacity
            </label>  
          </div>


        </form>
        
          <div style={{display: 'flex'}}>
            <button
              type='submit'
              form="createevent"
              value="Submit form"
              className={screenIsMobile === 'true' ? 'onboarding-submit-btn-mobile' : 'onboarding-submit-btn-desktop'}
              onClick={handleCreateNewEvent}>
              {btnIsLoading ? <FiLoader className='btn-loading' /> : 'CREATE NEW EVENT'}
            </button> 
          </div>      
      </div>
       
    </div>
  )
};

export default CreateEvent;
