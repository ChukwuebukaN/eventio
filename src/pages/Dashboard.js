import React, { Fragment, useEffect, useState } from 'react';
import LogoBlack from '../images/LogoBlack.png';
import { MdArrowDropDown, MdViewModule, MdViewStream } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { AuthRoutes } from '../constants';
import DropdownModal from '../components/modals/DropdownModal';
import authHandler from '../authHandler';
import EventsGridCard from '../components/cards/EventsGridCard';
import EventsListCard from '../components/cards/EventsListCard';
import dashboard from '../api/dashboard';
import moment from 'moment';

function Dashboard() {
  const history = useHistory();
  const user = authHandler.getUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEventsGrid, setEventsGrid] = useState(true);
  const [isEventsList, setEventsList] = useState(false);
  const [sortAllEvents, setSortAllEvents] = useState(true);
  const [sortFutureEvents, setSortFutureEvents] = useState(false);
  const [sortPastEvents, setSortPastEvents] = useState(false);
  const [initials, setInitials] = useState('');
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);

  /** handles routing to Profile page */
  const handleHomeRoute = () => {
    history.push(AuthRoutes.dashboard)
  };

  /** handles routing to Create Event page */
  const handleCreateEvent = () => {
    history.push(AuthRoutes.createEvent)
  };

  /** handles opening of Dropdown Modal */
  const openDropdownModal = () => {
    setModalOpen(true)
  };

  /** Displays Dropdown Modal */
  const modalAccountModal = () => {
    if (modalOpen === true) {
      return <DropdownModal />
    }
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

  /** Handles Events sorting on All Events Selected */
  const sortByAllEvents = () => {
    setSortAllEvents(true)
    setSortFutureEvents(false)
    setSortPastEvents(false)
  };

  /** Handles Events sorting on Future Events Selected */
  const sortByFutureEvents = () => {
    setSortAllEvents(false)
    setSortFutureEvents(true)
    setSortPastEvents(false)

    // Filter Future Events 
    const future = events.filter((event) => moment().isBefore(event.startsAt))
    setSortedEvents(future)
    // console.log('FUTURE EVENTS', future)
  };

  /** Handles Events sorting on Past Events Selected */
  const sortByPastEvents = () => {
    setSortAllEvents(false)
    setSortFutureEvents(false)
    setSortPastEvents(true)

    // Filter Past Events 
    const past = events.filter((event) => moment(event.startsAt).isBefore())
    setSortedEvents(past)
    // console.log('PAST EVENTS', past)
  };
  
  useEffect(() => {
    document.title = "Eventio • Dashboaord"
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
  }, []);

  const displaySortedEvents = () => {
    if (isEventsGrid === true) {
      return <EventsGridCard events={sortedEvents}/>
    } else if (isEventsList === true) {
      return <EventsListCard />
    }
  };




  useEffect(() => {
    const ac = new AbortController();
  
    dashboard
      .listOfEvents()
      .then((response) => {
        console.log('here', response)
        setEvents(response.data)
        setSortedEvents(response.data)
      })
    
    // cleanup component
    return function cleanup() {
      ac.abort();
    }
  }, []);

  return (
    <Fragment>
      <div className='dashboard'>
        <img src={LogoBlack} className='logo-dashboard' alt="Eventio Logo Black" onClick={handleHomeRoute}/>
        <div className='dashboard-account-wrapper'>
          <div className='dashboard-account-initials'>{initials}</div>
          <div className='dashboard-account-name' onClick={openDropdownModal}> {user.name} </div>
          <MdArrowDropDown className='dashboard-account-dropdown' onClick={openDropdownModal}/>
        </div>

        <div className='events-view-wrapper'>

          {/* Events View Sorter */}
          <div className='events-sorter'>
            <div
              className={sortAllEvents ? 'events-sorter-all-active' : ''}
              onClick={sortByAllEvents}>ALL EVENTS</div>
            <div
              className={sortFutureEvents ? 'events-sorter-future-active' : ''}
              onClick={sortByFutureEvents}>FUTURE EVENTS</div>
            <div
              className={sortPastEvents ? 'events-sorter-past-active' : ''}
              onClick={sortByPastEvents}>PAST EVENTS</div>
          </div>

          {/* Events View Switcher */}
          <div className='events-switcher'>
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
        </div>
        
      </div>
      {displaySortedEvents()}
      {modalAccountModal()}
      <div className='create-event-btn' onClick={handleCreateEvent()}>+</div>
    </Fragment>
  )
};

export default Dashboard;
