import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Auth from '../components/pages/Auth/Auth';
import Friends from '../components/pages/Friends/Friends';
import EditFriend from '../components/pages/EditFriend/EditFriend';
import NewFriend from '../components/pages/NewFriend/NewFriend';
import Holidays from '../components/pages/Holidays/Holidays';
import NewHoliday from '../components/pages/NewHoliday/NewHoliday';
import HolidayDetail from '../components/pages/HolidayDetail/HolidayDetail';
import EditHoliday from '../components/pages/EditHoliday/EditHoliday';
import HolidayFriends from '../components/pages/HolidayFriends/HolidayFriends';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';

import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/friends', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
    state = {
      authed: false,
      pendingUser: true,
    }

    componentDidMount() {
      connection();

      this.removeListener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            authed: true,
            pendingUser: false,
          });
        } else {
          this.setState({
            authed: false,
            pendingUser: false,
          });
        }
      });
    }

    componentWillUnmount() {
      this.removeListener();
    }

    render() {
      const {
        authed,
        pendingUser,
      } = this.state;

      const logoutClickEvent = () => {
        authRequests.logoutUser();
        this.setState({ authed: false });
      };

      if (pendingUser) {
        return null;
      }

      return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={ authed } logoutClickEvent={logoutClickEvent} />
            <div className="container">
              <div className='row'>
                <Switch>
                  <PrivateRoute path='/' exact component={Friends} authed={this.state.authed} />
                  <PrivateRoute exact path='/friends' component={Friends} authed={this.state.authed} />
                  <PrivateRoute path='/friends/:id/edit' component={EditFriend} authed={this.state.authed}/>
                  <PrivateRoute exact path='/friends/new' component={NewFriend} authed={this.state.authed} />
                  <PrivateRoute exact path='/holidays' component={Holidays} authed={this.state.authed} />
                  <PrivateRoute path='/holidays/new' component={NewHoliday} authed={this.state.authed} />
                  <PrivateRoute exact path='/holidays/:id' component={HolidayDetail} authed={this.state.authed} />
                  <PrivateRoute path='/holidays/:id/edit' component={EditHoliday} authed={this.state.authed} />
                  <PrivateRoute path='/holidays/:id/friends' component={HolidayFriends} authed={this.state.authed} />
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
      );
    }
}

export default App;
