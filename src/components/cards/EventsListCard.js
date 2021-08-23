import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dashboard from '../../api/dashboard';
import { isMobile } from '../../redux/user/userSlice';
import { FaUser } from 'react-icons/fa';
import moment from 'moment';

const EventsGridCard = () => {
  const [events, setEvents] = useState([]);
  const mobile = useSelector(isMobile)

  useEffect(() => {
    const ac = new AbortController();
  
    dashboard
      .listOfEvents()
      .then((response) => {
        console.log('here', response)
        setEvents(response.data)
      })
    
    // cleanup component
    return function cleanup() {
      ac.abort();
    }
  }, []);

  /** Get User Events to Display */
  const displayFetchedEvents = () => {

    // {fetchedEvents.startsAt}
    // let date = new Date('2013-03-10T02:00:00Z');
    // let dateDisplay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    // let Mydate = events.map((fetchedDate) => (fetchedDate.startsAt));
    // let result = Mydate.match(/\d\d:\d\d/);

    // let date = events.map((fetchedDate) => (fetchedDate.startsAt));
    // let convertedDateFrom = moment(date.from).toISOString();
    // console.log('date2', convertedDateFrom)
    let long = events[0].map((longWords) => (longWords.description));
    // let displayShort = long.map((dispShort) => (dispShort))

    // let short = displayShort.replace(/(.{7})..+/, "$1&hellip;");
    console.log(long)

    return events.map((fetchedEvents) => (
      <div className='events-list-item'>
        <div className={mobile ? 'event-list-title' : ''} > {fetchedEvents.title} </div>
        <div className={mobile ? 'event-list-description-mobile' : 'event-description-desktop'}> {fetchedEvents.description} </div>
        <div className={mobile ? 'hidden' : 'event-list-owner'}> {fetchedEvents.owner.firstName} {fetchedEvents.owner.lastName} </div>
        <div className={mobile ? 'event-list-date' : ''}> {fetchedEvents.startsAt} </div>
        <div className={mobile ? 'event-list-capacity' : ''}> <FaUser className={mobile ? 'hidden' : 'event-user'} /> {fetchedEvents.attendees.length} of {fetchedEvents.capacity} </div>
        <div className={mobile ? 'event-list-join-button' : ''}>JOIN</div>
      </div>
    ));
  };
  
  return (
    <div>
      <div className={mobile ? 'events-list-display' : ''}>
        <div className={mobile ? 'events-list-item-wrapper' : 'events-list-item-wrapper'}>
          {displayFetchedEvents()}
        </div>
      </div>
    </div>
  )
};

export default EventsGridCard;
