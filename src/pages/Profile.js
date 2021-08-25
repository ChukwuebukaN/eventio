import React, { useEffect, useState } from 'react';
import { MdArrowDropDown, MdViewModule, MdViewStream } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import authHandler from '../authHandler';
import LogoBlack from '../images/LogoBlack.png'
import { AuthRoutes } from '../constants';
import dashboard from '../api/dashboard';
import DropdownModal from '../components/modals/DropdownModal';
import EventsGridCard from '../components/cards/EventsGridCard';
import EventsListCard from '../components/cards/EventsListCard';

function Profile() {
  const history = useHistory();
  const [events, setEvents] = useState('');
  const screenIsMobile = authHandler.getUserIsMobile('userMobile')
  const [initials, setInitials] = useState('');
  const user = authHandler.getUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEventsGrid, setEventsGrid] = useState(true);
  const [isEventsList, setEventsList] = useState(false);
  const [sortedEvents, setSortedEvents] = useState([]);
  
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

  /** Handles Events view on Grid Selected */
  const eventsGridSelected = () => {
    setEventsGrid(true)
    setEventsList(false)
  };

  /** Handles Events view on List Selected */
  const eventsListSelected = () => {
    setEventsList(true)
    setEventsGrid(false)
  };

  /** Displays Dropdown Modal */
  const modalAccountModal = () => {
    if (modalOpen === true) {
        return <DropdownModal />
    };
  };

  /** handles routing to Home page */
  const handleHomeRoute = () => {
    history.push(AuthRoutes.dashboard)
  };

  /** Displays Sorted Events in Grid and List */
  // const displaySortedEvents = () => {
  //   if (isEventsGrid === true) {
  //     return <EventsGridCard />
  //   } else if (isEventsList === true) {
  //     return <EventsListCard  />
  //   }
  // };
  
  // const convertDateTime = () => {
  //   let DateTime = dateOfEvent + timeOfEvent;
  //   let converteDateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
  //   setStartsAt(converteDateTime)
  //   console.log('convertedDateTime 👍', converteDateTime)
  // };

  /** Get User Events IDs Display */
  // const eventsIds = () => {
  //   return events.map((fetchedEvents) => (
  //     <div className='' key={fetchedEvents._id}>
  //       <div className='event-id-text'> DETAIL EVENT: #{fetchedEvents._id} </div>
  //     </div>
  //   ));
  // };

  return (
    <div className='onboarding'>
      <img src={LogoBlack} onClick={handleHomeRoute} className='logo-mobile' alt="Eventio Logo Black" />
      <div className='dashboard-account-wrapper'>
          <div className='dashboard-account-initials'>{initials}</div>
          {/* <button > */}
            <div className='dashboard-account-name' onClick={openDropdownModal}> {user.name} </div>
            <MdArrowDropDown className='dashboard-account-dropdown' onClick={openDropdownModal}/>
          {/* </button> */}
      </div>
      <div>
        <div className='dashboard-account-bigger-initials'>{initials}</div>
        <div className='profile-name'>{user.name}</div>
        <div className='profile-email'>{user.email}</div>
      </div>
      <div className='profile-background'></div>

        <div className='my-events-text'>My events</div>
        <div className='events-view-wrapper'>
      
        {/* Events View Switcher */}
        <div className='events-switcher-profile'>
          <div>
            <MdViewModule
              className={isEventsGrid ? 'events-switcher-grid-active' : ''}
              onClick={eventsGridSelected}/>
          </div>
          <div>
            <MdViewStream
              className={isEventsList ? 'events-switcher-list-active' : ''}
              onClick={eventsListSelected}/>
          </div>
        </div>
        {modalAccountModal()}
        {/* {displaySortedEvents()} */}

      </div>
    </div>
  )
};

export default Profile;
