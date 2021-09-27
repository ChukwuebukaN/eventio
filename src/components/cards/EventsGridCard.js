import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "../../redux/user/userSlice";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import { AuthRoutes } from "../../constants";
import { useHistory } from "react-router-dom";
import authHandler from "../../authHandler";
// import dashboard from "../../api/dashboard";

const EventsGridCard = ({ events }) => {
  const mobile = useSelector(isMobile);
  // const userId = localStorage.getItem('user')
  const userId = authHandler.getUser("id");
  const history = useHistory();

  /** handles routing to Edit Event */
  const handleEditEvent = () => {
    history.push(AuthRoutes.editEvent);
  };

  /** handles Join Event */
  const handleJoinEvent = () => {
    // return events.map((fetchedEvents0) => {
    //   return console.log("JOIN EVENT Button Clicked", fetchedEvents0.id);
    // });
    const fetchedEventsFunc = () => {
      return events.map((fetchedEvents) => (
        <div className="event-id-text" key={fetchedEvents._id}>
          DETAIL EVENT: #{fetchedEvents.id}
        </div>
      ));
    };
    return events.map((fetchedEvents) => 
    console.log("JOIN EVENT Button Clicked", fetchedEvents.id);

    // let id = fetchedEvents.id;
    // dashboard.JoinEvent(id);
  };

  /** Convert ISO 8601 dateString to Date */
  const getDateString = (date) => {
    let datey = moment(date);
    let year = datey.year();
    let day = datey.format("DD");
    let time = datey.format("hh:mm A");
    let month = datey.format("MMMM");
    return month + " " + day + ", " + year + " - " + time;
  };

  const displayEventUserButton = (fetchedEvents) => {
    // console.log('Current User ID', userId.id)
    // console.log('user IDs for Backend', fetchedEvents.owner.id)
    // console.log('attendees IDs for Backend', fetchedEvents.attendees.id)

    if (fetchedEvents.owner.id === userId.id) {
      return (
        <div className="event-edit-button" onClick={handleEditEvent}>
          EDIT
        </div>
      );
    }
    if (fetchedEvents.owner.id !== userId.id) {
      return (
        <div className="event-join-button" onClick={handleJoinEvent}>
          JOIN
        </div>
      );
    }
    if (fetchedEvents.attendees.id === userId.id) {
      return <div className="event-leave-button">LEAVE</div>;
    }
  };

  /** Get User Events to Display in Grid */
  const displayFetchedEventsGrid = () => {
    return events.map((fetchedEvents) => (
      <div className="events-gird-item" key={fetchedEvents._id}>
        <div className="event-date">
          {" "}
          {getDateString(fetchedEvents.startsAt)}{" "}
        </div>
        <div className="event-title"> {fetchedEvents.title} </div>
        <div className="event-owner">
          {" "}
          {fetchedEvents.owner.firstName} {fetchedEvents.owner.lastName}{" "}
        </div>
        <div
          className={
            mobile ? "event-description-mobile" : "event-description-desktop"
          }
        >
          {" "}
          {fetchedEvents.description}{" "}
        </div>
        <div className="event-capacity-join">
          <div className="event-capacity">
            {" "}
            <FaUser className="event-user" /> {fetchedEvents.attendees.length}{" "}
            of {fetchedEvents.capacity}{" "}
          </div>
          {displayEventUserButton(fetchedEvents)}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="events-grid-display">
        <div className="events-gird-item-wrapper">
          {displayFetchedEventsGrid()}
        </div>
      </div>
    </div>
  );
};

export default EventsGridCard;
