import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dashboard from '../../api/dashboard';
import { isMobile } from '../../redux/user/userSlice';
import { FaUser } from 'react-icons/fa';
// import moment from 'moment';

const EventsCard = () => {
  const [events, setEvents] = useState([]);
  // const [datey1, setDatey1] = useState([]);
  // const [date2, setDate2] = useState([]);
  const mobile = useSelector(isMobile)

  useEffect(() => {
    const ac = new AbortController();
  
    dashboard
      .listOfEvents()
      .then((response) => {
        // console.log('here', response)
        // let date1 = response.data[0].startsAt
        // let date2 = response.data.map((dateStarted) => (dateStarted.startsAt))
        
        // console.log('date1', date1)
        // console.log('date2', date2)
        setEvents(response.data)
        // setDatey1(date1)
        // setDate2(date2)
      })
    
    // cleanup component
    return function cleanup() {
      ac.abort();
    }
  }, []);
  // {fetchedEvents.startsAt}
  // let date = new Date('2013-03-10T02:00:00Z');
  // let dateDisplay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  // let Mydate = events.map((fetchedDate) => (fetchedDate.startsAt));
  // let result = Mydate.match(/\d\d:\d\d/);

  // let date = events.map((fetchedDate) => (fetchedDate.startsAt));
  // let convertedDateFrom = moment(date.from).toISOString();
  // console.log('date2', convertedDateFrom)

  // let date = events.map((fetchedDate) => (fetchedDate.startsAt));
  // let convertedDateFrom =  Date.parse(date1)

  // const getGetString = () => {
  //   let cherish = new moment(datey1)
    
  //   let year = cherish.Year()
    
  //   let month = cherish.Month()
    
  //   return year+" "+month 
  // }



  /** Get User Events to Display */
  const displayFetchedEvents = () => {
    return events.map((fetchedEvents) => (
      <div className='events-gird-item'>
        <div className='event-date'> {fetchedEvents.startsAt} </div>
        <div className='event-title'> {fetchedEvents.title} </div>
        <div className='event-owner'> {fetchedEvents.owner.firstName} {fetchedEvents.owner.lastName} </div>
        <div className={mobile ? 'event-description-mobile' : 'event-description-desktop'}> {fetchedEvents.description} </div>
        <div className='event-capacity-join'>
          <div className='event-capacity'> <FaUser className='event-user' /> {fetchedEvents.attendees.length} of {fetchedEvents.capacity} </div>
          <div className='event-join-button'>JOIN</div>
        </div>
      </div>
    ));
  };
  
  return (
    <div>
      <div className='events-grid-display'>
        <div className='events-gird-item-wrapper'>
          {displayFetchedEvents()}
        </div>
      </div>
    </div>
  )
};

export default EventsCard;
