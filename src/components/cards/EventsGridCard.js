import React from 'react';
import { useSelector } from 'react-redux';
import { isMobile } from '../../redux/user/userSlice';
import { FaUser } from 'react-icons/fa';
import moment from 'moment';
import { AuthRoutes } from '../../constants';
import { useHistory } from 'react-router-dom';
import authHandler from '../../authHandler';

const EventsGridCard = ({events}) => {
  const mobile = useSelector(isMobile)
  // const userId = localStorage.getItem('user')
  const userId = authHandler.getUser('id')
  const history = useHistory();

  /** handles routing to Edit Event */
  const handleEditEvent = () => {
    history.push(AuthRoutes.editEvent)
  };

  /** Convert ISO 8601 dateString to Date */
  const getDateString = (date) => {
    let datey = moment(date)
    let year = datey.year()
    let day = datey.format('DD')
    let time = datey.format('hh:mm A')
    let month = datey.format('MMMM')
    return month+" "+day+", "+year+" - "+time
  }

  const displayEventUserButton = (fetchedEvents) => {
    console.log('Current User ID', userId.id)
    console.log('user IDs for Backend', fetchedEvents.owner.id)
    console.log('attendees IDs for Backend', fetchedEvents.attendees.id)
    
    if (fetchedEvents.owner.id === userId.id) {
      return <div className='event-edit-button' onClick={handleEditEvent}>EDIT</div>;
    } 
    if (fetchedEvents.owner.id !== userId.id) {
      return <div className='event-join-button' onClick>JOIN</div>
    }
    if (fetchedEvents.attendees.id === userId.id) {
      return <div className='event-leave-button'onClick>LEAVE</div>
    }
  }

  /** Get User Events to Display in Grid */
  const displayFetchedEventsGrid = () => {
    return events.map((fetchedEvents) => (
      <div className='events-gird-item' key={fetchedEvents._id}>
        <div className='event-date'> {getDateString(fetchedEvents.startsAt)} </div>
        <div className='event-title'> {fetchedEvents.title} </div>
        <div className='event-owner'> {fetchedEvents.owner.firstName} {fetchedEvents.owner.lastName} </div>
        <div className={mobile ? 'event-description-mobile' : 'event-description-desktop'}> {fetchedEvents.description} </div>
        <div className='event-capacity-join' >
        <div className='event-capacity'> <FaUser className='event-user' /> {fetchedEvents.attendees.length} of {fetchedEvents.capacity} </div>
        {displayEventUserButton(fetchedEvents)}
      </div>
      </div>
    ));
  };
  
  return (
    <div>
      <div className='events-grid-display'>
        <div className='events-gird-item-wrapper'>
          {displayFetchedEventsGrid()}
        </div>
      </div>
    </div>
  )
};

export default EventsGridCard;
