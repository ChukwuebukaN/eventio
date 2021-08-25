import React, { useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import authHandler from '../authHandler';
import LogoBlack from '../images/LogoBlack.png'
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
  const [dateOfEvent, setDateOfEvent] = useState('');
  const [timeOfEvent, setTimeOfEvent] = useState('');
  // const [startsAt, setStartsAt] = useState('');
  const [capacity, setCapacity] = useState('');
  const screenIsMobile = authHandler.getUserIsMobile('userMobile')
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  /** handles Create New Close */
  const handleClose = () => {
    history.push(AuthRoutes.dashboard)
  };
  
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

  /** handles Create Event and then routes to Dashboard */
  const handleCreateNewEvent = (e) => {
    setBtnIsLoading(true)
    e.preventDefault();
    try {
      // Create User API call
      dashboard
        .CreateEvent(title, description, capacity)
        .then((response) => {
          console.log('👍 NEW EVENT CREATED', response)
          if (response.status === 201) {
            console.log('👍 Event was created successfully', response)
            setBtnIsLoading(false)
            history.push(AuthRoutes.dashboard)
            console.log('👍 ROUTED')
          }
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    };
  };
  
  /** Display Close Button */
  const showCloseBtn = () => {
    if (screenIsMobile === 'true') {
      return <div className='createEvent-close-btn-mobile' onClick={handleClose}> <MdClose /></div>
    } else {
      return <div className='createEvent-close-btn' onClick={handleClose}> <MdClose className='createEvent-close-btn-icon' /> Close </div>
    }
  };

  return (
    <div className='onboarding'>
      <img src={LogoBlack} className='logo-mobile' alt="Eventio Logo Black" />
      {showCloseBtn()}
      <div className={ screenIsMobile === 'true' ? 'createEvent-wrapper' : 'createEvent-wrapper'}>
        <header className={ screenIsMobile === 'true' ? 'createEvent-title' : 'createEvent-title'}>
          <h2>Create new event.</h2>
          <h5>Enter details below.</h5>
        </header>
        <form id='createevent' onSubmit={handleCreateNewEvent}>
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
            <input required placeholder="Date" type="date" name="begin" min="2021-08-01" max="2050-12-31"
              className='onboarding-input'
              value={dateOfEvent}
              onChange={(e) => handleDateTransition(e.target.value)} />
            <label htmlFor='date' className={ inputDateActive ? 'Active' : '' }>
              
            </label>  
          </div>
          <div className='onboarding-form'>
            <input required placeholder="Time" type='time'
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
              className={screenIsMobile === 'true' ? 'createEvent-button' : 'createEvent-button'}
              onClick={handleCreateNewEvent}>
              {btnIsLoading ? <FiLoader className='btn-loading' /> : 'CREATE NEW EVENT'}
            </button> 
          </div>      
      </div>
       
    </div>
  )
};

export default CreateEvent;
