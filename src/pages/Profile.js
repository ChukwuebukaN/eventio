import React, { useEffect, useState } from "react";
import { MdArrowDropDown, MdViewModule, MdViewStream } from "react-icons/md";
import { useHistory } from "react-router-dom";
import authHandler from "../authHandler";
import LogoBlack from "../images/LogoBlack.png";
import { AuthRoutes } from "../constants";
import dashboard from "../api/dashboard";
import DropdownModal from "../components/modals/DropdownModal";

function Profile() {
  const history = useHistory();
  const [initials, setInitials] = useState("");
  const user = authHandler.getUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEventsGrid, setEventsGrid] = useState(true);
  const [isEventsList, setEventsList] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Eventio • Profile";
    try {
      dashboard.listOfEvents().then((response) => {
        console.log("👍 Backend Sever is Available!", response);
      });
      /** Capitalize User Initals */
      const userInitials = () => {
        const user = authHandler.getUser();
        let name = user.name;
        let separateWord = name.toLowerCase().split(" ");
        for (var i = 0; i < separateWord.length; i++) {
          separateWord[i] = separateWord[i].charAt(0).toUpperCase();
        }
        setInitials(separateWord.join(""));
      };
      userInitials();
    } catch (error) {
      console.log(error);
    }
    return function cleanup() {
      ac.abort();
    };
  }, []);

  /** handles opening of Dropdown Modal */
  const openDropdownModal = () => {
    setModalOpen(true);
  };

  /** handles closing of Dropdown Modal */
  const closeDropdownModal = () => {
    setModalOpen(false);
  };

  /** Handles Events view on Grid Selected */
  const eventsGridSelected = () => {
    setEventsGrid(true);
    setEventsList(false);
  };

  /** Handles Events view on List Selected */
  const eventsListSelected = () => {
    setEventsList(true);
    setEventsGrid(false);
  };

  /** Displays Dropdown Modal */
  const modalAccountModal = () => {
    if (modalOpen === true) {
      return <DropdownModal />;
    }
  };

  /** handles routing to Home page */
  const handleHomeRoute = () => {
    history.push(AuthRoutes.dashboard);
  };

  return (
    <div className="onboarding">
      <div className="dashboard-top-details">
        <img
          src={LogoBlack}
          className="logo-dashboard"
          alt="Eventio Logo Black"
          onClick={handleHomeRoute}
        />
        <div className="dashboard-account-wrapper">
          <div className="dashboard-account-initials">{initials}</div>
          <div className="dashboard-account-name" onClick={closeDropdownModal}>
            {" "}
            {user.name}{" "}
          </div>
          <MdArrowDropDown
            className="dashboard-account-dropdown"
            onClick={openDropdownModal}
          />
        </div>
      </div>

      <div className="profile-details">
        <div>
          <div className="dashboard-account-bigger-initials">{initials}</div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
        </div>
      </div>
      <div className="profile-background"></div>

      <div className="my-events-text">My Events</div>
      <div className="events-switcher-profile">
        <div>
          <MdViewModule
            className={isEventsGrid ? "events-switcher-grid-active" : ""}
            onClick={eventsGridSelected}
          />
        </div>
        <div>
          <MdViewStream
            className={isEventsList ? "events-switcher-list-active" : ""}
            onClick={eventsListSelected}
          />
        </div>

        <div className="events-view-wrapper"></div>
      </div>
      {modalAccountModal()}
      {/* {displaySortedEvents()} */}
    </div>
  );
}

export default Profile;
