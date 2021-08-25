import React, { useEffect, useState } from 'react';
import { MdArrowDropDown, MdDelete } from 'react-icons/md';
import { FiCheck } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import authHandler from '../authHandler';
import LogoBlack from '../images/LogoBlack.png'
import { AuthRoutes } from '../constants';
import dashboard from '../api/dashboard';
import DropdownModal from '../components/modals/DropdownModal';

function EditEvent() {
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
  const [capacity, setCapacity] = useState('');
  const [events, setEvents] = useState('');
  const screenIsMobile = authHandler.getUserIsMobile('userMobile')
  const [initials, setInitials] = useState('');
  const user = authHandler.getUser();
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    const ac = new AbortController();
    document.title = "Eventio • Dashboaord"
    try {
      dashboard
      .listOfEvents()
      .then((response) => {
        console.log('👍 Backend Sever is Available!', response)
        setEvents(response.data)
      })
      /** Capitalize User Initals */
      const userInitials = () => {
        const user = authHandler.getUser();
        let name = user.name
        let separateWord = name.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
            separateWord[i] = separateWord[i].charAt(0).toUpperCase();
        }
        setInitials(separateWord.join(''));
      };
      userInitials()
    } catch (error) {
      console.log(error)
    }
    return function cleanup() {
      ac.abort();
    }
  }, []);

  /** handles opening of Dropdown Modal */
  const openDropdownModal = () => {
    setModalOpen(true)
  };
  
  /** handles closing of Dropdown Modal */
  const closeDropdownModal = () => {
    setModalOpen(false)
  };

  /** Displays Dropdown Modal */
  const modalAccountModal = () => {
    if (modalOpen === true) {
        return <DropdownModal />
    };
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

  /** handles routing to Home page */
  const handleHomeRoute = () => {
    history.push(AuthRoutes.dashboard)
  };

    /** handles Delete Event */
    const deleteEvent = () => {
      try {
        // Create User API call
        dashboard
          .DeleteEvent(title, description, capacity)
          .then((response) => {
  
            console.log('👍 NEW EVENT CREATED', response)
            if (response.status === 201) {
              console.log('👍 Event was edited successfully', response)
              history.push(AuthRoutes.dashboard)
              console.log('👍 ROUTED')
            }
          })
          .catch(error => console.log(error))
      } catch (error) {
        console.log(error)
      };
    };

  /** handles Create Event and then routes to Dashboard */
  const handleEditEvent = (e) => {
    e.preventDefault();
    try {
      // Create User API call
      dashboard
        .EditEvent(title, description, capacity)
        .then((response) => {

          console.log('👍 NEW EVENT CREATED', response)
          if (response.status === 201) {
            console.log('👍 Event was edited successfully', response)
            history.push(AuthRoutes.dashboard)
            console.log('👍 ROUTED')
          }
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    };
  };

  /** Display Delete Button */
  const showDeletBtn = () => {
    if (screenIsMobile === 'true') {
      return <MdDelete onClick={deleteEvent} className='deleteEvent-btn-icon'/> 
    } else {
      return  <div onClick={deleteEvent} ><MdDelete className='deleteEvent-btn-icon-deskt'/><div className='deleteEvent-btn-text-deskt'>DELETE EVENT</div></div>
    }
  } 

  return (
    <div className='onboarding'>
      <img src={LogoBlack} onClick={handleHomeRoute} className='logo-mobile' alt="Eventio Logo Black" />
      <div className='dashboard-account-wrapper'>
        <div className='dashboard-account-initials'>{initials}</div>
          <div className='dashboard-account-name' onClick={closeDropdownModal}> {user.name} </div>
        <MdArrowDropDown className='dashboard-account-dropdown' onClick={openDropdownModal}/>
      </div>
      <div className='event-id-text'> DETAIL EVENT: #{events._id} </div>
      {showDeletBtn()}
      <div className={screenIsMobile === 'true' ? 'editEvent-wrapper' : 'editEvent-wrapper'}>
        <form id='editevent' onSubmit={handleEditEvent}>
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
      </div>
      {modalAccountModal()}
      <div className='editEvent-btn' onClick={handleEditEvent}><FiCheck className='editEvent-btn-icon' /></div>
    </div>
  )
};

export default EditEvent;
