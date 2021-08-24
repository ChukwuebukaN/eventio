import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import Details from './pages/Details';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import { AuthRoutes, NonAuthRoutes } from './constants';
import { useLocation } from 'react-router-dom';
import SideBar from './utils/Sidebar';
import authHandler from './authHandler';

function Routes() {
  const location = useLocation();
  const screenIsMobile = authHandler.getUserIsMobile('userMobile')

  /** This function handles Protected Routes and displays the SideBar on Large Screens and hides it on Smaller Screens */
  const displaySidebar = () => {
    if (screenIsMobile === 'true' && (location.pathname === NonAuthRoutes.signin || location.pathname === NonAuthRoutes.signup)) {
      return <Fragment>
        <Switch>
          <Route path={NonAuthRoutes.signin} component={SignIn} />
          <Route path={NonAuthRoutes.signup} component={SignUp} />
        </Switch>
      </Fragment>;
    } else if (location.pathname === NonAuthRoutes.signin || location.pathname === NonAuthRoutes.signup) {
      return <Fragment>
        <div className='app-wrapper-sidebar'>
          <SideBar className=''/>
          <Switch>
            <Route path={NonAuthRoutes.signin} component={SignIn} />
            <Route path={NonAuthRoutes.signup} component={SignUp} />
          </Switch>
        </div>
      </Fragment>;
    } else {
      return <Fragment>
        <Switch>
          <Route path={AuthRoutes.dashboard} render={props => <Dashboard {...props} />} />
          <Route path={AuthRoutes.createEvent} component={CreateEvent} />
          <Route path={`${AuthRoutes.details}/event/:entityId`} component={Details} />
          <Route path={AuthRoutes.profile} render={props => <Profile {...props} />} />
          <Route path={AuthRoutes.error404} component={Error404} />
        </Switch>
      </Fragment>;
    }
  };
  return (    
   displaySidebar()   
);
}

export default Routes;
