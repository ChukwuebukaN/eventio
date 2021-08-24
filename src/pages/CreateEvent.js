import React, { useState } from 'react';
// import { MdRemoveRedEye } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import authHandler from '../authHandler';
// import LogoBlack from '../images/LogoBlack.png'
import { AuthRoutes } from '../constants';
import dashboard from '../api/dashboard';

function CreateEvent() {
  const history = useHistory();
  const [inputTitleActive, setInputTitleActive] = useState(false);
  const [inputDescriptionActive, setInputDescriptionActive] = useState(false);
  const [inputDateActive, setInputDateActive] = useState(false);
  const [inputTimeActive, setInputTimeActive] = useState(false);
  const [inputCapacityActive, setInputCapacityActive] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateOfEvent, setDateOfEvent] = useState(null);
  const [timeOfEvent, setTimeOfEvent] = useState(null);
  const [startsAt, setStartsAt] = useState('');
  const [capacity, setCapacity] = useState(null);
  const screenIsMobile = authHandler.getUserIsMobile('userMobile')
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  /** handles Title form input transition */
  const handleTitleTransition = (text) => {
    setTitle(text);
    if (text !== '') {
      setInputTitleActive(true);
    } else {
      setInputTitleActive(false);
    }
  };
  
  /** handles Description form input transition */
  const handleDescriptionTransition = (text) => {
    setDescription(text);
    if (text !== '') {
      setInputDescriptionActive(true);
    } else {
      setInputDescriptionActive(false);
    }
  };

  /** handles Date form input transition */
  const handleDateTransition = (date) => {
    // console.log()
    setDateOfEvent(date);
    if (date !== '') {
      setInputDateActive(true);
    } else {
      setInputDateActive(false);
    }
  };

  /** handles Time form input transition */
  const handleTimeTransition = (time) => {
    setTimeOfEvent(time)
    if (time !== '') {
      setInputTimeActive(true);
    } else {
      setInputTimeActive(false);
    }
  };

  /** handles Capacity form input transition */
  const handleCapacityTransition = (text) => {
    setCapacity(text);
    if (text !== '') {
      setInputCapacityActive(true);
    } else {
      setInputCapacityActive(false);
    }
  };

  const convertDateTime = () => {
    let DateTime = dateOfEvent + dateOfEvent;
    let converteDateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
    setStartsAt(converteDateTime)
    console.log('convertedDateTime 👍', converteDateTime)
  };

  /** handles Create Event and then routes to Dashboard */
  const handleCreateNewEvent = (e) => {
    setBtnIsLoading(true)
    convertDateTime()
    console.log('convertedDateTime222 👍')
    e.preventDefault();

    // Create User API call
    dashboard
    .CreateEvent(title, description, startsAt, capacity)
    .then((response) => {
      console.log('👍 NEW EVENT', response)
      if (response.status === 201) {
        console.log('👍 Event was created successfully', response)
        history.push(AuthRoutes.dashboard)
        console.log('👍 ROUTED')
      }
    })
    .catch(error => console.log(error))
    setTimeout(() => {
      setBtnIsLoading(false)
    }, 3000);
  };

  return (
    <div className='onboarding'>
      <div className={ screenIsMobile === 'true' ? 'createEvent-wrapper' : 'onboarding-desktop'}>
      {/* <img src={LogoBlack} className={screenIsMobile === 'true' ? 'logo-mobile' : 'hidden'} alt="Eventio Logo Black" /> */}
        <header className={ screenIsMobile === 'true' ? 'createEvent-Title' : 'header-text-desktop'}>
          <h2>Create new event.</h2>
          <h5>Enter details below.</h5>
        </header>
        <form id='createevent' onSubmit={handleCreateNewEvent} >
          <div className='onboarding-form'>
            <input required type='text' className='onboarding-input' value={title} onChange={(e) => handleTitleTransition(e.target.value)}/>
            <label htmlFor='title' className={ inputTitleActive ? 'Active' : '' }>
              Title
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required type='text' className='onboarding-input' value={description} onChange={(e) => handleDescriptionTransition(e.target.value)}/>
            <label htmlFor='description' className={ inputDescriptionActive ? 'Active' : '' }>
              Description
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required placeholder=" " type="date" name="begin" min="2020-01-01" max="2040-12-31"
              className='onboarding-input'
              value={dateOfEvent}
              onChange={(e) => handleDateTransition(e.target.value)} />
            <label htmlFor='date' className={ inputDateActive ? 'Active' : '' }>
              
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required placeholder=" " type='time'
              className='onboarding-input'
              value={timeOfEvent}
              onChange={(e) => handleTimeTransition(e.target.value)} />
            <label htmlFor='time' className={ inputTimeActive ? 'Active' : '' }>
              
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required type='text'
              className='onboarding-input'
              value={capacity}
              onChange={(e) => handleCapacityTransition(e.target.value)} />
            <label htmlFor='capacity' className={ inputCapacityActive ? 'Active' : '' }>
              Capacity
            </label>  
          </div>

        </form>

          <div style={{display: 'flex', marginTop: '-40px'}}>
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
