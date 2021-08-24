import React from 'react';
import { useSelector } from 'react-redux';
import { isMobile } from '../../redux/user/userSlice';
import { FaUser } from 'react-icons/fa';
import moment from 'moment';

const EventsGridCard = ({events}) => {
  const mobile = useSelector(isMobile)

  // useEffect(() => {
  //   const ac = new AbortController();
  
  //   dashboard
  //     .listOfEvents()
  //     .then((response) => {
  //       console.log('here', response)
  //       // let date1 = response.data[0].startsAt
  //       // let date2 = response.data.map((dateStarted) => (dateStarted.startsAt))
        
  //       // console.log('date1', date1)
  //       // console.log('date2', date2)
  //       setEvents(response.data)
  //       // setDatey1(date1)
  //       // setDate2(date2)
  //     })
    
  //   // cleanup component
  //   return function cleanup() {
  //     ac.abort();
  //   }
  // }, []);

  const getDateString = (date) => {
    let datey = moment(date)
    let year = datey.year()
    let day = datey.format('DD')
    let time = datey.format('hh:mm A')
    let month = datey.format('MMMM')
    return month+" "+day+", "+year+" - "+time
  }


  /** Get User Events to Display */
  const displayFetchedEvents = () => {
    return events.map((fetchedEvents) => (
      <div className='events-gird-item' key={fetchedEvents._id}>
        <div className='event-date'> {getDateString(fetchedEvents.startsAt)} </div>
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

export default EventsGridCard;
