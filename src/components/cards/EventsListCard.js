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

  /** Shorten Long Descriptions on List Display */
  const shortenLongStrings = (string) => {
    if (string.length > 25) {
      let longString = string.substring(0, 24) + "...";
      return longString;
    } else {
      return string;
    }
  };

  /** Shorten Long Title on List Display */
  const shortenTitleStrings = (string) => {
    if (string.length > 25) {
      let longString = string.substring(0, 20) + "...";
      return longString;
    } else {
      return string;
    }
  };

  const displayEventUserButton = (fetchedEvents) => {
    console.log('Current User ID', userId.id)
    console.log('user IDs for Backend', fetchedEvents.owner.id)
    console.log('attendees IDs for Backend', fetchedEvents.attendees.id)
    
    if (fetchedEvents.owner.id === userId.id) {
      return <div className={mobile ? 'event-edit-button' : 'event-edit-button-deskt' } onClick={handleEditEvent}>EDIT</div>;
    } 
    if (fetchedEvents.owner.id !== userId.id) {
      return <div className={mobile ? 'event-join-button' : 'event-join-button-deskt' } onClick>JOIN</div>
    }
    if (fetchedEvents.attendees.id === userId.id) {
      return <div className={mobile ? 'event-leave-button' : 'event-leave-button-deskt' } onClick>LEAVE</div>
    }
  }

  /** Get User Events to Display in List */
  const displayFetchedEvents = () => {
    return events.map((fetchedEvents) => (
      <div className={mobile ? 'events-list-item' : 'events-list-item-deskt'} key={fetchedEvents._id}>
        <div className={mobile ? 'event-list-title' : 'event-list-title-deskt'} > {shortenTitleStrings(fetchedEvents.title)} </div>
        <div className={mobile ? 'event-list-description-mobile' : 'event-description-deskt'}> {shortenLongStrings(fetchedEvents.description)} </div>
        <div className={mobile ? 'hidden' : 'event-list-owner-deskt'}> {fetchedEvents.owner.firstName} {fetchedEvents.owner.lastName} </div>
        <div className={mobile ? 'event-list-date' : 'event-list-date-deskt'}> {getDateString(fetchedEvents.startsAt)} </div>
        <div className={mobile ? 'event-list-capacity' : 'event-list-capacity-deskt'}> <FaUser className='hidden' /> {fetchedEvents.attendees.length} of {fetchedEvents.capacity} </div>
        {displayEventUserButton(fetchedEvents)}        
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
